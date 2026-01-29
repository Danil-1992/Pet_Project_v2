// import { getAllGoodsFromBacket } from '@/05-entities/Backet/model/backetThunks';
// import { signOut } from '@/05-entities/User/model/userThunks';
// import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
// import React, { useEffect } from 'react';
// import { Link } from 'react-router';

// export default function NavBar(): React.JSX.Element {
//   const dispatch = useAppDispatch();
//   const { backetGoods } = useAppSelector((store) => store.backet);
//   console.log(backetGoods);

//   const logout = (): void => {
//     void dispatch(signOut());
//   };
//   const sumGoodsFromBacket = backetGoods.reduce((acc, el) => el.quantity + acc, 0);
//   useEffect(() => {
//     const abortController = new AbortController();
//     const { signal } = abortController;

//     const fetch = async (): Promise<void> => {
//       try {
//         await dispatch(getAllGoodsFromBacket(signal)).unwrap();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     void fetch();
//     return () => {
//       abortController.abort();
//     };
//   }, []);
//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <Link to={'/backet'}>В корзине {sumGoodsFromBacket}</Link>
//       <button onClick={logout}>Выход</button>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import { signOut } from '@/05-entities/User/model/userThunks';
import { Link, useNavigate } from 'react-router';
import { getAllGoodsFromBacket } from '@/05-entities/Backet/model/backetThunks';
// import { getAllCategory } from '@/05-entities/Category/model/categoryThunks';
// import { getAllBrands } from '@/05-entities/Brand/model/brandThunks';
// import { filterGoods } from '@/05-entities/Goods/model/goodThunks';
// import { type filterGoodsType } from '@/05-entities/Goods/types/good.types';
// import { getGoodsOfBasketBuUserId } from '@/05-entities/Basket/model/basketThunks';
// import { aiFilter } from '@/05-entities/Ai/model/aiThunks';
// import type { passForType } from '@/05-entities/Ai/types/aiSchema';

export default function NavBar(): React.JSX.Element {
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState(false);
  const [isCall, setIsCall] = useState(true);
  const [isChat, setIsChat] = useState(false);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState({ categoryId: '', brandId: '', minPrice: '', maxPrice: '' });
  const { user } = useAppSelector((state) => state.user);
  // const { categories } = useAppSelector((state) => state.categories);
  // const { brands } = useAppSelector((state) => state.brands);
  // const { basketsGood } = useAppSelector((state) => state.basket);
  // const { pass, dialog } = useAppSelector((state) => state.ai);
  // console.log(pass);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { backetGoods } = useAppSelector((store) => store.backet);
  // useEffect(() => {
  //   const newFilters: passForType = {};

  //   if (pass.brandId) newFilters.brandId = pass.brandId.toString();
  //   if (pass.categoryId) newFilters.categoryId = pass.categoryId.toString();
  //   console.log(newFilters);

  //   if (Object.keys(newFilters).length > 0) {
  //     // Обновляем URL
  //     setSearchParams(newFilters);
  //     // И сразу применяем фильтры
  //   }
  // }, [pass, dispatch, setSearchParams]);

  // const clearObj: filterGoodsType = Object.fromEntries(
  //   Object.entries(input).filter(([, value]) => value !== ''),
  // );

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getAllGoodsFromBacket(signal));
    return () => {
      abortController.abort();
    };
  }, []);

  // const makeFilter = (): void => {
  //   setSearchParams(clearObj);
  //   void dispatch(filterGoods(clearObj));
  // };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const loadingCategory = () => {
  //   const abortController = new AbortController();
  //   const { signal } = abortController;
  //   void dispatch(getAllCategory({ signal }));
  //   return () => {
  //     abortController.abort();
  //   };
  // };

  // const loadingBrand = () => {
  //   const abortController = new AbortController();
  //   const { signal } = abortController;
  //   void dispatch(getAllBrands({ signal }));
  //   return () => {
  //     abortController.abort();
  //   };
  // };
  const logoutHandler = (): void => {
    void dispatch(signOut());
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!showList) return;

      const target = event.target as Node;

      const isClickOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      const isClickOutsideHamburger =
        hamburgerRef.current && !hamburgerRef.current.contains(target);

      if (isClickOutsideMenu && isClickOutsideHamburger) {
        setShowList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showList]);

  const total = backetGoods.reduce((acc, el) => acc + el.quantity, 0);

  const aiChat = (): void => {
    void dispatch(aiFilter(message));
    setMessage('');
  };

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', zIndex: 1000, top: 0, left: 0 }}>
        <div
          style={{
            width: '100%',
            height: '80px',
            backgroundColor: '#825FB6',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            ref={hamburgerRef}
            id="hamburger-menu"
            style={{ fontSize: '42px', cursor: 'pointer' }}
            onClick={() => {
              setShowList(!showList);
              setFilter(false);
            }}
          >
            ☰
          </div>
          {showList && (
            <div
              ref={menuRef}
              id="dropdown-menu"
              style={{
                width: '100px',
                height: '150px',
                position: 'absolute',
                backgroundColor: '#E4B585',
                color: 'black',
                top: '80px',
                border: '1px solid',
                borderRadius: '5px',
                zIndex: 1000,
              }}
            >
              <p
                onClick={() => {
                  // setSearch('');
                  void navigate('/');
                  setShowList(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                Главная
              </p>
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  void navigate('/profile');
                  setShowList(false);
                }}
              >
                Профиль
              </p>
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setShowList(false);
                  setFilter(true);
                  loadingCategory();
                  loadingBrand();
                }}
              >
                Фильтр
              </p>
            </div>
          )}
          {filter && (
            <div
              id="filter-menu"
              style={{
                width: '350px',
                height: '330px',
                backgroundColor: 'grey',
                position: 'absolute',
                top: '100%',
                paddingLeft: '10px',
                display: 'flex',
              }}
            >
              <div>
                <div style={{ marginTop: '20px', marginBottom: '10px' }}>Категория</div>
                <select name="categoryId" onChange={inputHandler}>
                  <option disabled selected>
                    Выберите категорию
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div style={{ marginTop: '20px', marginBottom: '10px' }}>Бренд</div>
                <select name="brandId" onChange={inputHandler}>
                  <option disabled selected>
                    Выберите бренд
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <div style={{ marginTop: '20px', marginBottom: '10px' }}>Цена</div>
                <div>
                  От{' '}
                  <input
                    type="number"
                    name="minPrice"
                    value={input.minPrice}
                    onChange={inputHandler}
                    style={{ width: '100px', marginRight: '10px' }}
                  />
                  до{' '}
                  <input
                    type="number"
                    name="maxPrice"
                    value={input.maxPrice}
                    onChange={inputHandler}
                    style={{ width: '100px' }}
                  />
                </div>
                <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      makeFilter();
                      setFilter(false);
                    }}
                  >
                    Отфильтровать
                  </button>
                </div>
              </div>
              <div
                onClick={() => setFilter(false)}
                style={{ marginTop: '20px', cursor: 'pointer', height: '15px' }}
              >
                Закрыть
              </div>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              width: '20%',
              justifyContent: 'space-between',
              marginLeft: '50px',
            }}
          >
            <div
              style={{ fontSize: '20px', color: '#D5C232', cursor: 'pointer' }}
              onClick={() => {
                // setSearch('');
                // setSearchParams({});
                void navigate('/');
              }}
            >
              AMAZON
            </div>
            {/* <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск"
                style={{ paddingLeft: '29px' }}
              />
              <span style={{ position: 'absolute', left: '5px', fontSize: '20px' }}>🔍</span>
            </div> */}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 32 }}>
            <div style={{ color: 'orange', fontSize: '20px' }}>
              {user
                ? `Рады видеть тебя на нашем сайте, ${user.name}`
                : 'Приветствую тебя, дорогой посетитель'}
            </div>
          </div>
          <div
            onClick={() => navigate('/basket')}
            style={{
              display: 'flex',
              fontSize: '25px',
              backgroundColor: 'white',
              paddingLeft: '10px',
              cursor: 'pointer',
              marginRight: '20px',
            }}
          >
            <p style={{ width: '95px', height: '20px' }}>🛒 + {total}</p>
          </div>
          <div style={{ display: 'flex', marginLeft: 'auto', marginRight: '20px' }}>
            {user ? (
              <button
                style={{ backgroundColor: '#D68F1C', fontSize: '17px' }}
                onClick={() => {
                  logoutHandler();
                  void navigate('/enter');
                }}
              >
                Выход
              </button>
            ) : (
              <Link to={'/enter'}>Регистрация</Link>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          fontSize: '65px',
          left: '1900px',
          top: '950px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsChat(true);
          setIsCall(false);
        }}
      >
        {/* {isCall && <div>📳</div>} */}
      </div>
      {isChat && (
        <div
          style={{
            width: '400px',
            height: '400px',
            position: 'fixed',
            backgroundColor: 'white',
            top: '700px',
            left: '1000px',
            borderRadius: '10px',
            border: '2px solid grey',
          }}
        >
          <div
            style={{
              display: 'flex',
              paddingLeft: '150px',
              justifyContent: 'space-between',
              fontSize: '18px',
              backgroundColor: 'orange',
              paddingTop: '10px',
              paddingBottom: '8px',
            }}
          >
            <div>Онлайн чат</div>
            <div
              style={{ marginRight: '15px', cursor: 'pointer' }}
              onClick={() => {
                setIsCall(true);
                setIsChat(false);
              }}
            >
              X
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'grey',
              width: '396px',
              height: '290px',
              paddingLeft: '8px',
              overflowY: 'auto',
              wordWrap: 'break-word',
              paddingRight: '8px',
            }}
          >
            {dialog.map((mess) =>
              mess.aiAnswer ? (
                <div key={mess.aiAnswer} style={{ textAlign: 'left', marginBottom: '8px' }}>
                  {mess.aiAnswer}
                </div>
              ) : (
                <div key={mess.clientAnswer} style={{ textAlign: 'right', marginBottom: '8px' }}>
                  {mess.clientAnswer}
                </div>
              ),
            )}
          </div>
          <div>
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Введите свой вопрос"
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '270px', marginRight: '20px', paddingLeft: '8px', marginTop: '10px' }}
            />
            <button onClick={aiChat}>Отправить</button>
          </div>
        </div>
      )}
    </>
  );
}
