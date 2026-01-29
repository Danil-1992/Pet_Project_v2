const express = require('express');
const authRouter = require('./routers/auth.router');
const cookieParser = require('cookie-parser');
const goodRouter = require('./routers/good.router');
const favoritRouter = require('./routers/favorit.router');
const responseRouter = require('./routers/response.router');
const backetRouter = require('./routers/backet.router');
const orderRouter = require('./routers/order.router');
const cors = require('cors');
const app = express();
const socketIO = require('./socket/socket');

const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const http = require('http');
const corsOption = require('./socket/socketConfig');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

const server = http.createServer(app);
const io = socketIO.init(server);

// Проверка токена
io.use((socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const token = cookies.refreshToken;

  if (!token) {
    return next(new Error('Токена нет'));
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    // Определяем тип ошибки
    if (error.name === 'TokenExpiredError') {
      next(new Error('Токен истек'));
    } else {
      next(new Error('Неверный токен'));
    }
  }
});

io.on('connection', (socket) => {
  const userId = socket.user.user.id;
  console.log(`Подключился пользователь ${userId}`);

  socket.join(`user-${userId}`);


  socket.on('sent_notification', (data) => {
    if (data) {
      socket.emit('waitNotify', { message: 'Покупка оплачена' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Пользователь ${userId} отключился`);
  });
});

app.use('/api/auth', authRouter);
app.use('/api/goods', goodRouter);
app.use('/api/favorits', favoritRouter);
app.use('/api/responses', responseRouter);
app.use('/api/backet', backetRouter);
app.use('/api/orders', orderRouter);

module.exports = server;
