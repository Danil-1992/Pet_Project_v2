import { getAllGoods } from '@/05-entities/Goods/model/goodThunks';
import GoodCard from '@/05-entities/Goods/ui/GoodCard';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect, useMemo } from 'react';

export default function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { goods } = useAppSelector((store) => store.goods);
  const { user } = useAppSelector((store) => store.user);
  console.log(user);
   console.log(goods);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getAllGoods(signal));
    return () => abortController.abort();
  }, [dispatch]);



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
