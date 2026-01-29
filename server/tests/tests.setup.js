// tests/setup.js
// Глобальные моки или настройки
beforeEach(() => {
  // Мокаем console.log для чистоты вывода
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  // Восстанавливаем оригинальный console.log
  console.log.mockRestore();
});