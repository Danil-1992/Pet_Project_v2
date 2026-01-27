import { getAllGoodsFromBacket } from '@/05-entities/Backet/model/backetThunks';
import { signOut } from '@/05-entities/User/model/userThunks';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect } from 'react';
import { Link } from 'react-router';

export default function NavBar(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { backetGoods } = useAppSelector((store) => store.backet);
  const { status } = useAppSelector((store) => store.user);
  console.log(backetGoods);

  const logout = (): void => {
    void dispatch(signOut());
  };
  const sumGoodsFromBacket = backetGoods.reduce((acc, el) => el.quantity + acc, 0);
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetch = async (): Promise<void> => {
      try {
        await dispatch(getAllGoodsFromBacket(signal)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    void fetch();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to={'/backet'}>В корзине {sumGoodsFromBacket}</Link>
      <button onClick={logout}>Выход</button>
    </div>
  );
}
