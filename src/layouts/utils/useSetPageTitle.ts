import React from 'react';
import type { IRouteComponentProps } from 'umi';
import { useLocation } from 'react-router';
import { pathToRegexp } from 'path-to-regexp';
import { find } from 'lodash';

export interface IRoute {
  path?: string;
  exact?: boolean;
  redirect?: string;
  component?: any;
  routes?: IRoute[];
  key?: any;
  strict?: boolean;
  sensitive?: boolean;
  wrappers?: any[];
  [k: string]: any;
}

export const getFlatRoutes = (routes?: IRoute[]) => {
  if (!routes) {
    return [];
  }

  let flatRoutes: IRoute[] = [];
  routes.forEach((item) => {
    item.path && flatRoutes.push(item);
    if (item.routes) {
      flatRoutes = flatRoutes.concat(getFlatRoutes(item.routes));
    }
  });
  return flatRoutes;
};

const useSetPageTitle = (routes: IRouteComponentProps['route']['routes']) => {
  const { pathname } = useLocation();
  let resultRoutes = routes;

  const flatRoutes = React.useMemo(
    () => getFlatRoutes(resultRoutes),
    [resultRoutes],
  );

  const resultRoute = find(flatRoutes, ({ path }) =>
    pathToRegexp(path as string).test(pathname),
  );

  if (resultRoute?.name) {
    document.title = resultRoute.name;
  }
};

export default useSetPageTitle;
