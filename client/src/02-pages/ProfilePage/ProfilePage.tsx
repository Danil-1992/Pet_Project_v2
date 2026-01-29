import FavoritCard from '@/05-entities/Favorits/ui/FavoritCard';
import { getOrdersByUserId } from '@/05-entities/Order/model/orderThunks';
import { getAllResponsesByUser } from '@/05-entities/Response/model/responseThunks';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect, useState } from 'react';

export default function ProfilePage(): React.JSX.Element {
  const [isOrder, setIsOrder] = useState(true);
  const [isFavorits, setIsFavorits] = useState(false);
  const [isResponses, setIsResponses] = useState(false);

  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const { favorits } = useAppSelector((store) => store.favorits);
  const { allMyResponses } = useAppSelector((state) => state.responses);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getAllResponsesByUser(signal));
  }, []);


  let content;
  if (isOrder) {
    content = 'Мои заказы';
  } else if (isFavorits) {
    content = 'Избранные';
  } else {
    content = 'Отзывы';
  }

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getOrdersByUserId(signal));
  }, []);

  return (
    <div style={{ display: 'flex', marginTop: '150px', fontSize: '17px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'orange',
          width: '400px',
          gap: '30px',
          marginTop: '50px',
        }}
      >
        <div
          style={{ textDecoration: isOrder ? 'underline' : '', cursor: 'pointer' }}
          onClick={() => {
            setIsOrder(true);
            setIsFavorits(false);
            setIsResponses(false);
          }}
        >
          Мои покупки
        </div>
        <div
          style={{ textDecoration: isFavorits ? 'underline' : '', cursor: 'pointer' }}
          onClick={() => {
            setIsOrder(false);
            setIsFavorits(true);
            setIsResponses(false);
          }}
        >
          Избранные
        </div>
        <div
          style={{ textDecoration: isResponses ? 'underline' : '', cursor: 'pointer' }}
          onClick={() => {
            setIsOrder(false);
            setIsFavorits(false);
            setIsResponses(true);
          }}
        >
          Мои отзывы
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'green',
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        {<div>{content}</div>}
        <div
          style={{
            alignSelf: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
          }}
        >
          {isOrder &&
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid black',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  gap: '10px',
                  width: '1400px',
                }}
              >
                <div style={{ display: 'flex', gap: '150px' }}>
                  <div>{new Date(order.createdAt).toLocaleString('ru-RU')}</div>
                  <div> Сумма заказа {order.totalPrice} руб.</div>
                </div>
                <div>
                  {order.OrderItems.map((el) => (
                    <div
                      key={el.Good.id}
                      style={{ display: 'flex', gap: '20px', paddingBottom: '10px' }}
                    >
                      <div style={{ width: '200px' }}>{el.Good.name}</div>
                      <div>
                        {el.Good.price} руб/шт. * {el.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {isFavorits &&
            favorits.map((favorit) => (
              <div key={favorit.good_id} style={{ display: 'flex', gap: '36px' }}>
               <FavoritCard favorit={favorit}/>
              </div>
            ))}
          {isResponses &&
            allMyResponses.map((response) => (
              <div key={response.Good.id} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '500px' }}>
                  <div>{response.Good.name}</div>
                  <div>{response.comment}</div>
                </div>
                <div>{new Date(response.createdAt).toLocaleString('ru-RU')}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
