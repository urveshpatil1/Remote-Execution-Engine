import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { TRouteType } from '../interfaces';
import AboutPage from '../pages/AboutPage';
import ErrorPage from '../pages/ErrorPage';
import LandingPage from '../pages/LandingPage';
import MainPage from '../pages/MainPage';

export const publicRoutesList: TRouteType[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/login',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
];
