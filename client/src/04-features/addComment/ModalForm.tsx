import type { ReactNode } from 'react';
import React from 'react';

export default function ModalForm({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}): React.JSX.Element | null {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'fixed',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{ width: '350px', height: '350px', backgroundColor: 'white' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
