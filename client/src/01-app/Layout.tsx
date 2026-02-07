import NavBar from '@/03-widgets/NavBar/NavBar';
import { getFavorits } from '@/05-entities/Favorits/models/favoritThunks';
import { filterGoods, getAllGoods, getGoodBySearch } from '@/05-entities/Goods/model/goodThunks';
import { refresh } from '@/05-entities/User/model/userThunks';
import { useAppDispatch } from '@/06-shared/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';

export default function Layout(): React.JSX.Element {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useAppDispatch();
  console.log(search);

  useEffect(() => {
    void dispatch(refresh());
  }, []);

  const category_id = searchParams.get('category_id');
  const brand_id = searchParams.get('brand_id');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const newObj = Object.fromEntries(
    Object.entries({ category_id, brand_id, minPrice, maxPrice }).filter(
      ([, value]) => value !== null,
    ),
  );

  useEffect(() => {
    if (search.length > 0) {
      const abortController = new AbortController();
      const { signal } = abortController;
      const timer = setTimeout(() => {
        void dispatch(getGoodBySearch({ word: search, signal }));
      }, 500);
      console.log('Зашел в поиск');

      return () => {
        abortController.abort();
        clearTimeout(timer);
      };
    } else if (Object.keys(newObj).length > 0) {
      dispatch(filterGoods(newObj));
      setSearch('');
      console.log('Зашел в фильтр');
    } else {
      const abortController = new AbortController();
      const { signal } = abortController;
      void dispatch(getAllGoods(signal));
      console.log('Зашел в выгрузку всех');

      return () => abortController.abort();
    }
  }, [dispatch, search,newObj]);


  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getFavorits({ signal }));
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <NavBar search={search} setSearch={setSearch} setSearchParams={setSearchParams} />
      <Outlet />
    </div>
  );
}
