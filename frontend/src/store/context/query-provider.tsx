import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';

import { useAuthContext } from './auth/context';
import { handleAllErrors } from '@/utils/errors';
import { toast } from 'sonner';
import { USER_DATA_KEY } from '@/config/app';
import axios from 'axios';

function getErrorTitle(error: string | number): string {
  switch (error) {
    case 400:
      return 'Validation Error';
    case 401:
      return 'Not Authenticated';
    case 403:
      return 'Permission Denied';
    case 404:
      return 'Not Found';
    case 405:
      return 'Not Allowed';
    default:
      return 'Error';
  }
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthContext();

  // Create a client
  const queryClient = React.useMemo(() => {
    const client = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          const err = handleAllErrors(error);
          const title = getErrorTitle(err.status);
          toast.error(`${title}: ${err.message}`);
          if (err.status === 401) logout();
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          const err = handleAllErrors(error);
          const title = getErrorTitle(err.status);
          toast.error(`${title}: ${err.message}`);

          if (err.status === 401) logout();
        },
      }),
      defaultOptions: {
        queries: {
          queryFn: async ({ queryKey }) => {
            const token = localStorage.getItem(USER_DATA_KEY) || 'null';

            if (!token) {
              throw new Error('Unauthenticated');
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.get(
              `${import.meta.env.VITE_API_URL}${queryKey}`
            );
            return res.data;
          },
          refetchOnMount: true,
          // refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      },
    });
    return client;
  }, [open, logout]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
