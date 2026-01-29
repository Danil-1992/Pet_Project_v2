import React from 'react';
import { useAppSelector } from '@/06-shared/hooks/hooks';
import EmptyBasket from '@/05-entities/Backet/ui/BacketCard/EmptyBacket';
import BacketCard from '@/05-entities/Backet/ui/BacketCard/BacketCard';
import OrderPanel from '@/05-entities/Backet/ui/BacketCard/OrderPanel';


export default function Backet(): React.JSX.Element {
  const { backetGoods } = useAppSelector((store) => store.backet);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ alignSelf: 'center', marginTop: '30px', marginBottom: '45px' }}>Корзина</div>

      {backetGoods.length === 0 ? (
        <EmptyBasket />
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {backetGoods.map((good) => (
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  paddingBottom: '70px',
                  marginBottom: '10px',
                  borderBottom: '1px solid',
                  width: '1400px',
                  paddingLeft: '20px',
                }}
                key={good.id}
              >
                <BacketCard good={good} />
              </div>
            ))}
          </div>
          <OrderPanel />
        </>
      )}
    </div>
  );
}
