import React from 'react';
import { Link } from 'react-router';

const EmptyBasket = (): React.JSX.Element => (
  <div style={{ textAlign: 'center', marginTop: '100px' }}>
    <div style={{ fontSize: '24px', marginBottom: '20px' }}>Корзина пуста</div>
    <div>Товары в корзину не добавлены</div>
    <Link to={'/'} style={{ color: 'blue', textDecoration: 'underline' }}>
      На главную
    </Link>
  </div>
);

export default EmptyBasket;
