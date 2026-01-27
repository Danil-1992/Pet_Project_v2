import NavBar from '@/03-widgets/NavBar/NavBar';
import { getFavorits } from '@/05-entities/Favorits/models/favoritThunks';
import { refresh } from '@/05-entities/User/model/userThunks';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

export default function Layout(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.user);
console.log(user);

  useEffect(() => {
    void dispatch(refresh());
  }, []);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getFavorits({ signal }));
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
