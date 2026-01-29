import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

let socketRef: { current: Socket | null } = { current: null };

export const config = {
  init() {
    if (socketRef.current?.connected) {
      console.log('Сокет уже подключен');
      return socketRef.current;
    }

    if (socketRef.current) {
      socketRef.current.connect();
      return socketRef.current;
    }

    socketRef.current = io('http://localhost:3000/', {
      withCredentials: true,
    });

    const socket = socketRef.current;


    socket.on('connect', () => {
      console.log('✅ Подключился к серверу');
    });

    socket.on('connect_error', (error) => {
      console.error('Ошибка подключения:', error.message);

      if (error.message === 'Токена нет') {
        toast.error('Войдите в аккаунт');
      } else if (error.message === 'Неверный токен') {
        toast.error('Сессия истекла, войдите заново');
      } else {
        toast.error('Ошибка соединения с сервером');
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Отключился:', reason);
    });

    return socket;
  },

  getSocket() {
    return socketRef.current;
  },

  sent(sum: number) {
    socketRef.current?.on('waitNotify', (data: { message: string }) => {
      toast.info(`${data.message} на сумму ${sum.toString()} рублей`, {
        position: 'top-right',
        autoClose: 5000,
      });
    });
  },
  disconnect() {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  },
};
