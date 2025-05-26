import { Outlet, Navigate } from 'react-router-dom';

import Layout from '../index';
import { useAuthContext } from '@/store/context';
import SplashScreen from '@/utils/components/splash-screen';
import { SIGN_IN } from '@/config/page-routes';

const Authenticated = () => {
  const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={SIGN_IN} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Authenticated;
