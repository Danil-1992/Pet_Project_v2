import { useAppSelector } from './hooks';


export const useGoodSelectors = (goodId: string):  { 
  isLike: boolean; 
  backet: { quantity: number; exists: boolean } 
} => {
  const isLike = useAppSelector(
    (state) => state.favorits.favorits.some((el) => el.good_id === Number(goodId)),
    (prev, next) => prev === next,
  );

  const backet = useAppSelector(
    (state) => {
      const item = state.backet.backetGoods.find((el) => el.good_id === Number(goodId));
      return item ? { quantity: item.quantity, exists: true } : { quantity: 0, exists: false };
    },
    (prev, next) => prev.quantity === next.quantity && prev.exists === next.exists,
  );

  return { isLike, backet };
};
