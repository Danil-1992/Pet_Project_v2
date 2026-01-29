import React from 'react';
import type { favoritType } from '../types/favoritSchema';
import FavoritButton from './FavoritButton';
import { useGoodSelectors } from '@/06-shared/hooks/hooksMemo';

export default function FavoritCard({ favorit }: { favorit: favoritType }): React.JSX.Element {
  const { isLike } = useGoodSelectors(favorit.Good.id.toString());
  return (
    <div>
      {' '}
      <img
        src={JSON.parse(favorit.Good.image)[0]}
        width={290}
        height={300}
        alt={favorit.Good.name}
      />
      <div>
        <div>{favorit.Good.name}</div>
        <div>{favorit.Good.price} руб.</div>
      </div>
      <div>
        <FavoritButton isLike={isLike} good={favorit.Good} />
      </div>
    </div>
  );
}
