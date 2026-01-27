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

io.use((socket, next) => {
  console.log('Подключение');
  const cookies = cookie.parse(socket.handshake.headers.cookie || '');
  const token = cookies.refreshToken;
 

  if (!token) {
    return new Error('Токена нет');
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    next(new Error('Неверный токен'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.user.user.id;
  console.log(`Подключился`);
  socket.join(`user-${userId}`);

  socket.on('sent_notification', (data) => {
    if (data) {
      socket.emit('waitNotify', { message: 'Покупка оплачена' });
    }
  });
  socket.on('disconnect', () => {
    console.log('Пользователь вышел из чата');
  });
});

app.use('/api/auth', authRouter);
app.use('/api/goods', goodRouter);
app.use('/api/favorits', favoritRouter);
app.use('/api/responses', responseRouter);
app.use('/api/backet', backetRouter);
app.use('/api/orders', orderRouter);



module.exports = server;
