import React from 'react';
import Router from './Router/Router';
import { ToastContainer } from 'react-toastify';

export default function App(): React.JSX.Element {
  return (
    <div>
      <Router />
      <ToastContainer
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
