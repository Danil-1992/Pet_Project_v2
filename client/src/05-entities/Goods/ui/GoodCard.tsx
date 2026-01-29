import React, { memo } from 'react';
import type { goodType } from '../types/goodSchema';
import FavoritButton from '@/05-entities/Favorits/ui/FavoritButton';
import { Link } from 'react-router';
import AddToBacket from '@/04-features/AddToBacket/AddToBacket';
import { useGoodSelectors } from '@/06-shared/hooks/hooksMemo';

const GoodCard = ({ good }: { good: goodType }): React.JSX.Element => {
  const { isLike, backet } = useGoodSelectors(good.id.toString());

  console.log(backet);

  return (
    <div>
      <p style={{ textAlign: 'center' }}>{good.name}</p>
      <img src={JSON.parse(good.image.toString())[0]} width={550} height={600} />
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            width: '30%',
            justifyContent: 'space-between',
            marginLeft: '15px',
          }}
        >
          <p>{good.price} руб</p>
          <p style={{ backgroundColor: 'orange', fontSize: '17px', cursor: 'pointer' }}>
            <Link to={`/good/${good.id.toString()}`}>Подробнее</Link>
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '25px',
            flexGrow: 1,
            cursor: 'pointer',
          }}
        >
          <FavoritButton isLike={isLike} good={good} />
        </div>
        <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          Остаток {good.quantity}
        </div>
        <AddToBacket good={good} backet={backet} />
      </div>
    </div>
  );
};

export default memo(GoodCard);
