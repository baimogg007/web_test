import * as paths from './const/paths';

type RouteItem = {
  path?: string;
  iconPrefix?: string;
  name?: string;
  authority?: string;
  exact?: boolean;
  component?: string;
  redirect?: string;
  hideInMenu?: boolean;
  routes?: RouteItem[];
};

type Routes = RouteItem[];

const sourceRoutes = [
  {
    path: paths.loginPath,
    routes: [
      {
        path: paths.loginPath,
        name: '登录',
        component: '@/pages/Login',
      },
    ],
  },
  {
    path: paths.rootPath,
    component: '@/layouts/BasicLayout/index',
    routes: [
      {
        path: paths.rootPath,
        exact: true,
        redirect: paths.productionStatusPath,
      },
      {
        path: paths.productionStatusPath,
        name: '实时生产情况',
        authority: 'admin.production',
        iconPrefix: 'Clock',
        component: '@/pages/ProductionStatus/index',
      },
      {
        path: paths.materialStatusReportPath,
        name: '报料情况',
        authority: '',
        iconPrefix: 'Dashboard',
        hideInMenu: true,
        component: '@/pages/MaterialStatusReport/index',
      },
      {
        path: paths.adjustThePlanPath,
        name: '调整生产计划',
        authority: '',
        iconPrefix: 'Dashboard',
        hideInMenu: true,
        component: '@/pages/AdjustThePlan/index',
      },
      {
        path: paths.productionHistoryPath,
        name: '产量情况',
        authority: 'admin.yield',
        iconPrefix: 'Money',
        component: '@/pages/ProductionHistory/index',
      },
      {
        path: paths.historyPath,
        name: '历史记录',
        authority: 'admin.history',
        iconPrefix: 'Clipboard',
        component: '@/pages/History/index',
      },
      {
        path: paths.informationBasePath,
        name: '管模信息库',
        authority: 'admin.mould.information',
        iconPrefix: 'Clipboard',
        component: '@/pages/InformationBase/index',
      },
      {
        path: paths.testerPath,
        name: '试验员',
        authority: 'admin.trial',
        iconPrefix: 'Users',
        component: '@/pages/Tester/index',
      },
      {
        path: paths.settingPath,
        name: '管理设置',
        authority: 'admin.manager',
        iconPrefix: 'Setting',
        component: '@/pages/Setting/index',
      },
      {
        path: '*',
        component: '@/pages/404',
      },
    ],
  },
  {
    path: '*',
    component: '@/pages/404',
  },
];

const resultCD: Routes = [];

// resultI18nList.forEach(({ code }) => {
//   const getRoute = (routeData: RouteItem) => {
//     const { path, routes, redirect, ...restRouteData } = routeData;
//     if (routes) {
//       return {
//         redirect: redirect ? `/${code}${redirect}` : undefined,
//         path: `/${code}${path}`,
//         routes: resultRoutes(routes),
//         ...restRouteData,
//       };
//     }

//     return {
//       redirect: redirect ? `/${code}${redirect}` : undefined,
//       ...restRouteData,
//       path: `/${code}${path}`,
//     };
//   };

//   function resultRoutes(routesData: Routes): Routes {
//     return routesData.map(getRoute);
//   }

//   resultCD.push(...resultRoutes(sourceRoutes));
// });

export default [...resultCD, ...sourceRoutes];
