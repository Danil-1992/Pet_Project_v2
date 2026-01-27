import React, { useState } from 'react';
import SignUpPage from '../SignUpPage/SignUpPage';
import SignInPage from '../SignInPage/SignInPage';

export default function ChooseEnterOrRegister(): React.JSX.Element {
  const [rega, setRega] = useState(true);
  const [login, setLogin] = useState(false);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '350px',
          gap: '20px',
          border: '2px solid grey',
          borderRadius: '3px',
          width: '210px',
          margin: '350px auto 0',
        }}
      >
        <div
          style={{ backgroundColor: rega ? 'orange' : 'white', cursor: 'pointer' }}
          onClick={() => {
            setLogin(false);
            setRega(true);
          }}
        >
          Зарегистрироваться
        </div>
        <div
          style={{ backgroundColor: login ? 'green' : 'white', cursor: 'pointer' }}
          onClick={() => {
            setRega(false);
            setLogin(true);
          }}
        >
          Войти
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        {rega && <SignUpPage />}
        {login && <SignInPage />}
      </div>
    </div>
  );
}
