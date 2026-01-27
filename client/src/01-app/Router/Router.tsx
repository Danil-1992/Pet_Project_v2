import ChooseEnterOrRegister from '@/02-pages/ChooseEnterOrRegister/ChooseEnterOrRegister';
import MainPage from '@/02-pages/MainPage/MainPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '../Layout';
import DetailsPage from '@/02-pages/DetailsPage/DetailsPage';
import Backet from '@/02-pages/Backet/Backet';
import AdminPage from '@/02-pages/AdminPage/AdminPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export default function Router(): React.JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/good/:id" element={<DetailsPage />} />
              <Route path="/backet" element={<Backet />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route element={<PublicRoute/>}>
              <Route path="enter" element={<ChooseEnterOrRegister />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
