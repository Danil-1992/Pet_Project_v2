import { addOrder } from '@/05-entities/Order/model/orderThunks';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect, useRef, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearBacket } from '@/05-entities/Backet/model/backetThunks';
import { Link } from 'react-router';

export default function Backet(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  const [loading, setLoading] = useState(false);
  const { backetGoods } = useAppSelector((store) => store.backet);
  const summ = backetGoods.reduce((acc, el) => el.quantity * el.Good.price + acc, 0);
const sum = summ
  useEffect(() => {
    socketRef.current = io('http://localhost:3000/', {
      withCredentials: true,
    });
    const socket = socketRef.current;
    socket.on('connect', () => {
      console.log('Подключился');
    });
    socket.on('waitNotify', (data: { message: string }) => {
      toast.info(`${data.message} на сумму ${sum.toString()} рублей`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

    socket.on('disconnect', () => {
      console.log('Покинул чат');
    });
  }, []);
  const makeOrder = async (): Promise<void> => {
    setLoading(true);
    try {
      await dispatch(addOrder({ goods: backetGoods, total: summ })).unwrap();
      await dispatch(clearBacket(backetGoods)).unwrap();
    } catch (error) {
      console.error('Ошибка', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '20px' }}>Выбранные товары</div>
      <div>
        {backetGoods.length === 0 && (
          <>
            <div>Товары в корзину не добавлены</div> <Link to={'/'}>На главную</Link>
          </>
        )}
      </div>
      <div>{loading && <div>Загрузка...</div>}</div>
      <div>
        {backetGoods.map((el) => (
          <div key={el.id} style={{ display: 'flex' }}>
            <div style={{ width: '200px' }}>{el.Good.name}</div>
            <div style={{ width: '100px' }}> {el.quantity} шт</div>
            <div style={{ width: '200px' }}>{el.Good.price} цена за шт</div>
            <div>{el.quantity * el.Good.price} сумма, руб</div>
          </div>
        ))}
      </div>
      <div>{backetGoods.length !== 0 && <div>Сумма к оплате {summ} рублей</div>}</div>
      <div>{backetGoods.length > 0 && <button onClick={makeOrder}>Оплатить</button>}</div>
    </div>
  );
}
