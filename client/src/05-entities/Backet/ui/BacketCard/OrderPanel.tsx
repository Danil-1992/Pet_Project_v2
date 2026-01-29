import React, { memo, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import { addOrder } from '@/05-entities/Order/model/orderThunks';
import { clearBacket } from '@/05-entities/Backet/model/backetThunks';
import BasketModal from '../BasketModal/BasketModal';
import { config } from '../../../Socket/socket.config';

const OrderPanel = (): React.JSX.Element => {
  const { backetGoods } = useAppSelector((store) => store.backet);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    config.init();

    return () => {
      config.disconnect();
    };
  }, []);
  const totalSum = useMemo(
    () => backetGoods.reduce((acc, el) => el.quantity * el.Good.price + acc, 0),
    [backetGoods],
  );

  const makeOrder = async (): Promise<void> => {
    try {
      await dispatch(addOrder({ goods: backetGoods, total: totalSum })).unwrap();
      config.sent(totalSum);
      setIsOpen(true);
    } catch (error) {
      console.error('Ошибка в makeOrder:', error);
    }
  };

  const handleClose = async (): Promise<void> => {
    await dispatch(clearBacket(backetGoods)).unwrap();
    setIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '400px',
          left: '1600px',
          width: '300px',
          height: '230px',
          border: '1px solid',
          paddingLeft: '10px',
        }}
      >
        <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom: '20px' }}>Итог</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
          <div>Количество позиций</div>
          <div>{backetGoods.length}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
          <div>Итого к оплате</div>
          <div style={{ paddingRight: '20px' }}>{totalSum} руб.</div>
        </div>
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={makeOrder}>Оформить заказ</button>
        </div>
      </div>

      <BasketModal isOpen={isOpen} onClose={handleClose}>
        <div>Заказ успешно создан</div>
      </BasketModal>
    </>
  );
};

export default memo(OrderPanel);
