import React, { memo } from 'react';
import type { backetType } from '../../types/backetSchema';
import AddToBacket from '@/04-features/AddToBacket/AddToBacket';
import { useGoodSelectors } from '@/06-shared/hooks/hooksMemo';

const BacketCard = ({ good }: { good: backetType }): React.JSX.Element => {
  const { backet } = useGoodSelectors(good.Good.id.toString());

  return (
    <>
      <img src={JSON.parse(good.Good.image)[0]} width={290} height={300} alt={good.Good.name} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>В наличии {good.Good.quantity}</div>
        <div>{good.Good.name}</div>
        <div>Артикул {good.Good.sku}</div>
        <div>Цена за шт. {good.Good.price} руб.</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'end',
          marginRight: '50px',
          alignSelf: 'center',
        }}
      >
        <AddToBacket backet={backet} good={good.Good} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', gap: '20px' }}>
        <div>{good.Good.price * good.quantity} руб.</div>
      </div>
    </>
  );
};

export default memo(BacketCard);
