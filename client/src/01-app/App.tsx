import React from 'react';
import Router from './Router/Router';
import { ToastContainer } from 'react-toastify';

export default function App(): React.JSX.Element {
  return (
    <div>
      <Router />
      <ToastContainer
        position="top-right" // где показывать: top-right, top-left, bottom-right, bottom-left
        autoClose={3000} // время до закрытия (мс)
        hideProgressBar={false} // показать/скрыть индикатор времени
        newestOnTop={false} // новые тосты сверху или снизу
        closeOnClick // закрыть по клику
        rtl={false} // справа-налево (для языков)
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
