import {
  createBrowserRouter,
  ScrollRestoration,
  type RouteObject,
} from 'react-router';

import * as pageRoutes from './config/page-routes';

// import Home from './pages/index';
import UnAuthenticated from './layouts/protections/unauthenticated';
import ErrorPage from './pages/404';
import SignUpPage from './pages/auth/sign-up';
import SignInPage from './pages/auth/sign-in';
import Authenticated from './layouts/protections/authenticated';
import DashboardPage from './pages/dashboard';
import StaffPage from './pages/dashboard/staff';

const routes: RouteObject[] = [
  //   Auth
  {
    path: '/auth',
    element: (
      <>
        <UnAuthenticated />
        <ScrollRestoration />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: pageRoutes.HOMEPAGE,
      //   element: <Home />,
      // },
      {
        path: pageRoutes.SIGN_UP,
        element: <SignUpPage />,
      },

      {
        path: pageRoutes.SIGN_IN,
        element: <SignInPage />,
      },
      //   {
      //     path: pageRoutes.RESET_PASSWORD_PAGE,
      //     element: <ResetPassword />,
      //   },
      //   {
      //     path: pageRoutes.RESET_PASSWORD_VERIFY_PAGE,
      //     element: <VerifyPassword />,
      //   },
      //   {
      //     path: pageRoutes.RESET_PASSWORD_CONFIRM_PAGE,
      //     element: <ConfirmPasswordReset />,
      //   },
      //   {
      //     path: pageRoutes.RESET_PASSWORD_SUCCESS_PAGE,
      //     element: <PasswordResetSuccessful />,
      //   },
    ],
  },

  //   Dashboard
  {
    path: '/',
    element: (
      <>
        <Authenticated />
        <ScrollRestoration />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: pageRoutes.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: pageRoutes.STAFF_PAGE,
        element: <StaffPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
