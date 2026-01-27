import type { favoriteType } from '@/05-entities/Favorits/types/favoritSchema';
import { useAppSelector } from './hooks';
import type { backetType } from '@/05-entities/Backet/types/backetSchema';

export const useGoodSelectors = (goodId: string): favoriteType | backetType => {
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
