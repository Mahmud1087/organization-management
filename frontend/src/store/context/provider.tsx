import React from 'react';

import QueryProvider from './query-provider';
import AuthProvider from './auth/provider';
import CheckAuth from '@/layouts/protections/check-auth';
import ToastProvider from './toast/provider';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <QueryProvider>
          <CheckAuth>{children}</CheckAuth>
        </QueryProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default Provider;
