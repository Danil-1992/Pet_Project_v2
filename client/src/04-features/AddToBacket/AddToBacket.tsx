import { addToBacketIn, deleteFromBacketIn } from '@/05-entities/Backet/model/backetThunks';
import type { backetType } from '@/05-entities/Backet/types/backetSchema';
import { addToBacket, deleteFromBacket } from '@/05-entities/Goods/model/goodThunks';
import type { goodType } from '@/05-entities/Goods/types/goodSchema';
import { useAppDispatch } from '@/06-shared/hooks/hooks';
import React from 'react';

export default function AddToBacket({
  good,
  backet,
}: {
  good: goodType;
  backet: backetType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();
  const deleteFromBacketHandler = async (): Promise<void> => {
    try {
      await dispatch(deleteFromBacket(good.id.toString())).unwrap();
      await dispatch(deleteFromBacketIn(good.id.toString())).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const addToBacketHandler = async (): Promise<void> => {
    try {
      await dispatch(addToBacket(good.id.toString())).unwrap();
      await dispatch(addToBacketIn(good.id.toString())).unwrap();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      {good.quantity === 0 && (
        <div style={{ display: 'flex', flexGrow: 2, alignItems: 'center' }}>
          <div>Товар зарезервирован</div>
          <div style={{ cursor: 'pointer' }} onClick={deleteFromBacketHandler}>
            -
          </div>
        </div>
      )}
      {(backet?.quantity === 0 || backet?.quantity === undefined) && (
        <button onClick={addToBacketHandler}>Добавить в корзину</button>
      )}
      {backet.quantity > 0 && backet?.quantity !== undefined && good.quantity > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '11px',
            width: '50%',
            flexGrow: 5,
            justifyContent: 'end',
            marginRight: '15px',
          }}
        >
          <p style={{ cursor: 'pointer' }} onClick={addToBacketHandler}>
            +
          </p>
          <p>{backet?.quantity}</p>
          <p style={{ cursor: 'pointer' }} onClick={deleteFromBacketHandler}>
            -
          </p>
        </div>
      )}
    </div>
  );
}
