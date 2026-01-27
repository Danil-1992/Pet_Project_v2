import { z } from 'zod';

export const goodSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  sku: z.string(),
  category_id: z.number(),
  brand_id: z.number(),
  quantity: z.number(),
  image: z.string(),
  features: z.object({
    care: z.string(),
    color: z.string(),
    sizes: z.array(z.string()),
    material: z.string(),
  }),
});

export type goodType = z.infer<typeof goodSchema>;

export const arrayGoodSchema = z.array(goodSchema);

export type arrayGoodType = z.infer<typeof arrayGoodSchema>;

// import React, { memo } from 'react';
// import type { goodType } from '../types/goodSchema';
// import { useAppDispatch } from '@/06-shared/hooks/hooks';
// import FavoritButton from '@/05-entities/Favorits/ui/FavoritButton';
// import { Link } from 'react-router';
// import AddToBacket from '@/04-features/AddToBacket/AddToBacket';
// import { useGoodSelectors } from '@/06-shared/hooks/hooksMemo';

// const GoodCard = memo(({ good }: { good: goodType }): React.JSX.Element | null => {
//   const dispatch = useAppDispatch();
//   // const isLike = useAppSelector(
//   //   (state) => state.favorits.favorits.some((el) => el.good_id === good.id),
//   //   // 👇 Ключевое: сравниваем boolean, а не массивы!
//   //   (prevIsLike, nextIsLike) => prevIsLike === nextIsLike,
//   // );
//   // const { backetGoods } = useAppSelector((store) => store.backet);
//   // const backet = useMemo(
//   //   () => backetGoods.find((el) => el.good_id === good.id),
//   //   [backetGoods, good.id],
//   // );
//   const { isLike, backet } = useGoodSelectors(good.id);

//   if (!backet) {
//     return null;
//   }
//   console.log(backet);

//   return (
//     <div>
//       <p style={{ textAlign: 'center' }}>{good.name}</p>
//       <img src={JSON.parse(good.image.toString())[0]} width={550} height={600} />
//       <div style={{ display: 'flex' }}>
//         <div
//           style={{
//             display: 'flex',
//             width: '30%',
//             justifyContent: 'space-between',
//             marginLeft: '15px',
//           }}
//         >
//           <p>{good.price} руб</p>
//           <p style={{ backgroundColor: 'orange', fontSize: '17px', cursor: 'pointer' }}>
//             <Link to={`/good/${good.id.toString()}`}>Подробнее</Link>
//           </p>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             marginLeft: '25px',
//             flexGrow: 1,
//             cursor: 'pointer',
//           }}
//         >
//           <FavoritButton isLike={isLike} good={good} />
//         </div>
//         <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
//           Остаток {good.quantity}
//         </div>
//         <AddToBacket good={good} backet={backet} />
//         {/* {good.quantity === 0 && (
//           <div>
//             <div>Товар зарезервирован</div>
//             <div style={{ cursor: 'pointer' }} onClick={deleteFromBacketHandler}>
//               -
//             </div>
//           </div>
//         )}
//         {(backet?.quantity === 0) | (backet?.quantity === undefined) && (
//           <button onClick={addToBacketHandler}>Добавить в корзину</button>
//         )}
//         {backet?.quantity > 0 && backet?.quantity !== undefined && good.quantity > 0 && (
//           <div
//             style={{
//               display: 'flex',
//               gap: '11px',
//               width: '50%',
//               flexGrow: 5,
//               justifyContent: 'end',
//               marginRight: '15px',
//             }}
//           >
//             <p style={{ cursor: 'pointer' }} onClick={addToBacketHandler}>
//               +
//             </p>
//             <p>{backet?.quantity}</p>
//             <p style={{ cursor: 'pointer' }} onClick={deleteFromBacketHandler}>
//               -
//             </p>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// });

// export default GoodCard;










// import { useAppSelector } from './hooks';

// export type GoodSelectorResult = {
//   isLike: boolean;
//   backet?: {
//     quantity: number;
//     exists: boolean;
//   };
// };

// export const useGoodSelectors = (goodId: number): GoodSelectorResult => {
//   const isLike = useAppSelector(
//     (state) => state.favorits.favorits.some((el) => el.good_id === goodId),
//     (prev, next) => prev === next,
//   );

//   const backet = useAppSelector(
//     (state) => {
//       const item = state.backet.backetGoods.find((el) => el.good_id === goodId);
//       return item ? { quantity: item.quantity, exists: true } : undefined;
//     },
//     // Кастомный компаратор - сравниваем только quantity и exists
//     (prev, next) => prev?.quantity === next?.quantity && prev?.exists === next?.exists,
//   );

//   return { isLike, backet };
// };
