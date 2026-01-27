import { useAppDispatch } from '@/06-shared/hooks/hooks';
import React from 'react';
import { addFavorit, deleteFavorit } from '../models/favoritThunks';
import liked from '../../../../public/free-icon-love-14035644.png';
import notLike from '../../../../public/free-icon-favorite-7382164.png';
import type { goodType } from '@/05-entities/Goods/types/goodSchema';

export default function FavoritButton({
  isLike,
  good,
}: {
  isLike: boolean;
  good: goodType;
}): React.JSX.Element {
  const dispatch = useAppDispatch();

  const addHandler = (goodId: number): void => {
    void dispatch(addFavorit(goodId));
  };

  const deleteHandler = (goodId: number): void => {
    void dispatch(deleteFavorit(goodId));
  };
  return (
    <div>
      {' '}
      {isLike ? (
        <img src={liked} width={25} height={25} onClick={() => deleteHandler(good.id)} />
      ) : (
        <img src={notLike} width={25} height={25} onClick={() => addHandler(good.id)} />
      )}
    </div>
  );
}
