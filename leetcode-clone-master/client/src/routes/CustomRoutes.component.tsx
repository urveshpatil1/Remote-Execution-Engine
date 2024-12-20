import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getAllUpdatedRouteList } from '../custom';

export const CustomRoutes: React.FC<Record<string, unknown>> = () => {
  const router = createBrowserRouter(getAllUpdatedRouteList(), {
    basename: import.meta.env.VITE_ROUTE_BASENAME || undefined,
  });

  return <RouterProvider router={router} />;
};
