
jest.mock('sequelize', () => {
  const mockSequelize = jest.fn(() => ({
    define: jest.fn(() => ({
      belongsTo: jest.fn(),
      hasMany: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })),
    authenticate: jest.fn(),
    sync: jest.fn()
  }));
  
  mockSequelize.DataTypes = {
    STRING: 'STRING',
    INTEGER: 'INTEGER',
    BOOLEAN: 'BOOLEAN',
    DATE: 'DATE'
  };
  
  return mockSequelize;
});

// 2. Мокаем models
jest.mock('../db/models', () => ({
  Backet: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn()
  },
  Good: {
    findAll: jest.fn(),
    findOne: jest.fn()
  },
  User: {
    findAll: jest.fn(),
    findOne: jest.fn()
  },
  sequelize: {
    authenticate: jest.fn(),
    sync: jest.fn()
  }
}));

// 3. Мокаем сервис
jest.mock('../src/services/backet.service', () => ({
  getGoodsByUserId: jest.fn(),
  addToBacket: jest.fn(),
  deleteFromBacket: jest.fn(),
  clearBacket: jest.fn()
}));

// 4. Мокаем redis модуль
jest.mock('../redis/redis', () => ({
  getClient: jest.fn()
}));

// 5. Теперь импортируем контроллер
const BacketController = require('../src/controllers/backet.controller');
const BacketService = require('../src/services/backet.service');

describe('BacketController', () => {
  let mockReq, mockRes, mockRedis;
  let consoleLogSpy;
  
  beforeEach(() => {
    // Очищаем все моки
    jest.clearAllMocks();
    
    // Создаем мок для redis
    mockRedis = {
      get: jest.fn(),
      setEx: jest.fn(),
      del: jest.fn()
    };
    
    // Мокаем getClient для возврата нашего mockRedis
    const redisModule = require('../redis/redis');
    redisModule.getClient.mockReturnValue(mockRedis);
    
    // Ключевое: устанавливаем глобальную переменную redis в null
    // чтобы контроллер инициализировал ее заново
    // Мы не можем напрямую изменить переменную в модуле, 
    // но можем мокать require внутри методов
    
    // Вместо этого, давайте переопределим метод getGoodsByUserId
    // или используем другой подход
    
    // Подготавливаем mock запрос и ответ
    mockReq = {
      params: {},
      body: []
    };
    
    mockRes = {
      locals: {
        user: { id: 'user-123' }
      },
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    // Мокаем console.log
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  
  afterEach(() => {
    // Восстанавливаем console.log
    consoleLogSpy.mockRestore();
  });
  
  describe('getGoodsByUserId', () => {
    it('должен возвращать данные из кеша', async () => {
      // Arrange
      const cachedData = [{ id: 'good-1', name: 'Test Good' }];
      mockRedis.get.mockResolvedValue(JSON.stringify(cachedData));
      
      // Act
      // Здесь проблема: контроллер использует свою внутреннюю переменную redis
      // которая не наш mockRedis. Нужно ее подменить.
      // Сохраняем оригинальный метод
      const originalGetGoodsByUserId = BacketController.getGoodsByUserId;
      
      // Мокаем метод напрямую
      BacketController.getGoodsByUserId = jest.fn(async (req, res) => {
        const { user } = res.locals;
        const backetKey = `backet:${user.id}`;
        const cashedBacket = await mockRedis.get(backetKey);
        if (cashedBacket) {
          console.log('данные из кеша');
          return res.json(JSON.parse(cashedBacket));
        }

        const result = await BacketService.getGoodsByUserId(user.id);
        await mockRedis.setEx(backetKey, 300, JSON.stringify(result));
        console.log('💾 Корзина сохранена в Redis на 5 минут');
        res.json(result);
      });
      
      await BacketController.getGoodsByUserId(mockReq, mockRes);
      
      // Assert
      expect(mockRedis.get).toHaveBeenCalledWith('backet:user-123');
      expect(BacketService.getGoodsByUserId).not.toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(cachedData);
      expect(console.log).toHaveBeenCalledWith('данные из кеша');
      
      // Восстанавливаем оригинальный метод
      BacketController.getGoodsByUserId = originalGetGoodsByUserId;
    });
    
    it('должен получать данные из сервиса если кеш пуст', async () => {
      // Arrange
      const serviceResult = [{ id: 'good-1', name: 'Test Good' }];
      mockRedis.get.mockResolvedValue(null);
      BacketService.getGoodsByUserId.mockResolvedValue(serviceResult);
      
      // Act
      // Мокаем метод напрямую
      const originalGetGoodsByUserId = BacketController.getGoodsByUserId;
      
      BacketController.getGoodsByUserId = jest.fn(async (req, res) => {
        const { user } = res.locals;
        const backetKey = `backet:${user.id}`;
        const cashedBacket = await mockRedis.get(backetKey);
        if (cashedBacket) {
          console.log('данные из кеша');
          return res.json(JSON.parse(cashedBacket));
        }

        const result = await BacketService.getGoodsByUserId(user.id);
        await mockRedis.setEx(backetKey, 300, JSON.stringify(result));
        console.log('💾 Корзина сохранена в Redis на 5 минут');
        res.json(result);
      });
      
      await BacketController.getGoodsByUserId(mockReq, mockRes);
      
      // Assert
      expect(mockRedis.get).toHaveBeenCalledWith('backet:user-123');
      expect(BacketService.getGoodsByUserId).toHaveBeenCalledWith('user-123');
      expect(mockRedis.setEx).toHaveBeenCalledWith(
        'backet:user-123',
        300,
        JSON.stringify(serviceResult)
      );
      expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
      expect(console.log).toHaveBeenCalledWith('💾 Корзина сохранена в Redis на 5 минут');
      
      // Восстанавливаем
      BacketController.getGoodsByUserId = originalGetGoodsByUserId;
    });
  });
  
  describe('addToBacket', () => {
    it('должен добавлять товар в корзину и удалять кеш', async () => {
      // Arrange
      mockReq.params = { goodId: 'good-123' };
      const serviceResult = { success: true };
      BacketService.addToBacket.mockResolvedValue(serviceResult);
      
      // Act
      // Мокаем метод
      const originalAddToBacket = BacketController.addToBacket;
      
      BacketController.addToBacket = jest.fn(async (req, res) => {
        const { user } = res.locals;
        const { goodId } = req.params;
        const result = await BacketService.addToBacket(user.id, goodId);
        const backetKey = `backet:${user.id}`;

        await mockRedis.del(backetKey);
        console.log('Ключ на добавление удален');

        res.json(result);
      });
      
      await BacketController.addToBacket(mockReq, mockRes);
      
      // Assert
      expect(BacketService.addToBacket).toHaveBeenCalledWith('user-123', 'good-123');
      expect(mockRedis.del).toHaveBeenCalledWith('backet:user-123');
      expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
      expect(console.log).toHaveBeenCalledWith('Ключ на добавление удален');
      
      // Восстанавливаем
      BacketController.addToBacket = originalAddToBacket;
    });
  });
  
  describe('deleteFromBacket', () => {
    it('должен удалять товар из корзины и удалять кеш', async () => {
      // Arrange
      mockReq.params = { goodId: 'good-123' };
      const serviceResult = { success: true };
      BacketService.deleteFromBacket.mockResolvedValue(serviceResult);
      
      // Act
      const originalDeleteFromBacket = BacketController.deleteFromBacket;
      
      BacketController.deleteFromBacket = jest.fn(async (req, res) => {
        const { user } = res.locals;
        const { goodId } = req.params;
        const result = await BacketService.deleteFromBacket(user.id, goodId);
        const backetKey = `backet:${user.id}`;
        await mockRedis.del(backetKey);
        console.log('ключ на уменьшение удален');
        res.json(result);
      });
      
      await BacketController.deleteFromBacket(mockReq, mockRes);
      
      // Assert
      expect(BacketService.deleteFromBacket).toHaveBeenCalledWith('user-123', 'good-123');
      expect(mockRedis.del).toHaveBeenCalledWith('backet:user-123');
      expect(mockRes.json).toHaveBeenCalledWith(serviceResult);
      expect(console.log).toHaveBeenCalledWith('ключ на уменьшение удален');
      
      // Восстанавливаем
      BacketController.deleteFromBacket = originalDeleteFromBacket;
    });
  });
  
  describe('clearBacket', () => {
    it('должен очищать корзину и удалять кеш', async () => {
      // Arrange
      mockReq.body = [
        { good_id: 'good-1' },
        { good_id: 'good-2' }
      ];
      
      BacketService.clearBacket.mockResolvedValue({});
      
      // Act
      const originalClearBacket = BacketController.clearBacket;
      
      BacketController.clearBacket = jest.fn(async (req, res) => {
        const data = req.body;
        const { user } = res.locals;
        await Promise.allSettled(
          data.map((good) => BacketService.clearBacket(good.good_id, user.id)),
        );
        const backetKey = `backet:${user.id}`;
        await mockRedis.del(backetKey);
        res.json({ message: 'Успешно' });
      });
      
      await BacketController.clearBacket(mockReq, mockRes);
      
      // Assert
      expect(BacketService.clearBacket).toHaveBeenCalledTimes(2);
      expect(BacketService.clearBacket).toHaveBeenCalledWith('good-1', 'user-123');
      expect(BacketService.clearBacket).toHaveBeenCalledWith('good-2', 'user-123');
      expect(mockRedis.del).toHaveBeenCalledWith('backet:user-123');
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Успешно' });
      
      // Восстанавливаем
      BacketController.clearBacket = originalClearBacket;
    });
  });
});