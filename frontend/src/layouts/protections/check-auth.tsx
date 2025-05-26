import { useAuthContext } from '@/store/context';
import { useGetAuthQuery } from '@/store/queries/auth';
import SplashScreen from '@/utils/components/splash-screen';
import React from 'react';

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);

  const { login, logout } = useAuthContext();

  const { data: response, status, isLoading } = useGetAuthQuery();

  React.useEffect(() => {
    if (!isLoading && status !== 'pending') {
      if (status === 'success' && response?.data) {
        login(response.data);
      } else logout();
      setLoading(false);
    }
  }, [login, logout, response, status, isLoading]);

  return loading ? <SplashScreen /> : children;
};

export default CheckAuth;
