import type { ReactNode } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';

export default function BasketModal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}): React.JSX.Element | null {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
      }}
      onClick={() => {
        onClose();
        void navigate('/profile');
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '300px',
          height: '300px',
          backgroundColor: 'white',
          border: '1px solid black',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
