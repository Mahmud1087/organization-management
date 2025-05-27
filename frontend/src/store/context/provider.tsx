import React from 'react';

import QueryProvider from './query-provider';
import AuthProvider from './auth/provider';
import CheckAuth from '@/layouts/protections/check-auth';
import ModalProvider from './modals/provider';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <AuthProvider>
        <QueryProvider>
          <CheckAuth>{children}</CheckAuth>
        </QueryProvider>
      </AuthProvider>
    </ModalProvider>
  );
}

export default Provider;
