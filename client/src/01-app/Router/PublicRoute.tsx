import { useAppSelector } from '@/06-shared/hooks/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router';

export default function PublicRoute(): React.JSX.Element | null {
  const { user, status } = useAppSelector((store) => store.user);

  if (status === 'loading') {
    return null;
  }

  if (user) {
    return <Navigate to={'/'} replace/>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
