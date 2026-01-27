import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './01-app/App';
import { Provider } from 'react-redux';
import { store } from './01-app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
