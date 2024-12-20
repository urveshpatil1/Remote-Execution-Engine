import { RouteObject, redirect } from 'react-router-dom';
import { TCustomRoute } from '../interfaces';
import { protectedRoutesList } from '../routes/protected.route';
import { publicRoutesList } from '../routes/public.route';
import ErrorPage from '../pages/ErrorPage';
import { toast } from 'react-toastify';

export const withOutLoginTokenRedirect =
  (import.meta.env.VITE_WITHOUT_LOGIN_TOKEN_REDIRECT as string) || '/login';

export const withLoginTokenRedirect =
  (import.meta.env.VITE_WITH_LOGIN_TOKEN_REDIRECT as string) || '/';

const routesList: TCustomRoute = {
  protected: protectedRoutesList,
  public: publicRoutesList,
};

/**
 * The function `getProtectedRouteList` takes a list of protected routes and returns a modified list
 * with additional properties, including an error element and a loader function that checks for an
 * authentication token.
 * @returns The function `getProtectedRouteList` returns an array of `RouteObject` objects.
 */
const getProtectedRouteList = (protectedRouteList: TCustomRoute['protected']): RouteObject[] => {
  if (protectedRouteList && protectedRouteList.length > 0) {
    return protectedRouteList.map((item: RouteObject) => ({
      ...item,
      errorElement: <ErrorPage />,
      loader: () => {
        const authToken = localStorage.getItem('token');
        if (authToken && authToken !== '') {
          return null;
        }
        toast.error('Please login to continue');
        return redirect(withOutLoginTokenRedirect);
      },
    }));
  }
  return [] as RouteObject[];
};

/**
 * The function `getPublicRouteList` takes a list of public routes and returns a new list of routes
 * with an added `errorElement` property.
 * @returns The function `getPublicRouteList` returns an array of `RouteObject` objects.
 */
const getPublicRouteList = (publicRouteList: TCustomRoute['public']): RouteObject[] => {
  if (publicRouteList && publicRouteList.length > 0) {
    return publicRouteList.map((item: RouteObject) => ({
      ...item,
      errorElement: <ErrorPage />,
    }));
  }
  return [] as RouteObject[];
};

export const getAllUpdatedRouteList = (): RouteObject[] => {
  let routeUpdatedCollection: RouteObject[] = [] as RouteObject[];
  if (routesList) {
    if (routesList.public) {
      routeUpdatedCollection = [
        ...routeUpdatedCollection,
        ...getPublicRouteList(routesList.public),
      ];
    }
    if (routesList.protected) {
      routeUpdatedCollection = [
        ...routeUpdatedCollection,
        ...getProtectedRouteList(routesList.protected),
      ];
    }
  }
  return routeUpdatedCollection;
};
