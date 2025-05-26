import { DASHBOARD } from '@/config/page-routes';
import { useAuthContext } from '@/store/context';
import SplashScreen from '@/utils/components/splash-screen';
import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

const UnAuthenticated = ({ children }: { children?: React.ReactNode }) => {
  const outlet = useOutlet();
  const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

  if (isLoading) {
    // While checking auth, show loading UI or nothing
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD} replace />;
  }

  // User is NOT authenticated
  return outlet || children;
};

export default UnAuthenticated;
