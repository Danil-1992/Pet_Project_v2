import GoodCard from '@/05-entities/Goods/ui/GoodCard';
import { useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useMemo } from 'react';

export default function MainPage(): React.JSX.Element {
  const { goods } = useAppSelector((store) => store.goods);
  const { user } = useAppSelector((store) => store.user);
  console.log(user);
  console.log(goods);

  const memoizedGoods = useMemo(() => goods, [goods]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {memoizedGoods.map((good) => (
        <div key={good.id}>
          <GoodCard good={good} />
        </div>
      ))}
    </div>
  );
}
