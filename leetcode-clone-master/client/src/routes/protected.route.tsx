import { TRouteType } from '../interfaces';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage';
import ProblemPage from '../pages/ProblemPage';
import ProblemsListPage from '../pages/ProblemsListPage';

export const protectedRoutesList: TRouteType[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/problems',
        element: <ProblemsListPage />,
      },
      {
        path: '/problem/:id',
        element: <ProblemPage />,
      },
    ],
  },
];
