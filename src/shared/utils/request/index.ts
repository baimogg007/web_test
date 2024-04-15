import type {
  RequestOptionsInit,
  RequestOptionsWithoutResponse,
  RequestMethod,
  RequestOptionsWithResponse,
  RequestResponse,
} from 'umi-request';
import { extend } from 'umi-request';
import useRequest from 'ahooks/lib/useRequest';
import type {
  Options,
  Plugin,
  Result,
  Service,
} from 'ahooks/lib/useRequest/src/types';
// import baseAPIHost, { allowDebug } from '@/shared/consts/baseAPIHost';
import type { RequestError } from './errorHandler';
import requestConfig from './requestConfig';
import errorHandler from './errorHandler';
import buildResInitData from './buildResInitData';
import { API_HOST, TOKEN_KEY } from '@/shared/const';
import locationServices from '@/shared/services/locationServices';
import * as paths from '@/routes/const/paths';
import { notificationError } from '@/shared/services/notification';

let requestMethodInstance: RequestMethod;
const getRequestMethod = () => {
  if (requestMethodInstance) {
    // request method 已经示例化
    return requestMethodInstance;
  }

  // runtime 配置可能应为依赖顺序的问题在模块初始化的时候无法获取，所以需要封装一层在异步调用后初始化相关方法
  // 当用户的 app.ts 中依赖了该文件的情况下就该模块的初始化时间就会被提前，无法获取到运行时配置

  const errorAdaptor = requestConfig.errorConfig?.adaptor;
  requestMethodInstance = extend({
    // errorHandler,
    // mode: 'no-cors',
    ...requestConfig,
    // credentials: SERVE_ENV === 'pro' ? 'include' : 'same-origin',
    // headers: {
    //   platform: 'BE',
    // },
  });

  // 中间件统一res错误处理
  requestMethodInstance.use(async (ctx, next) => {
    await next();
    const { req, res } = ctx;
    // @ts-ignore
    if (req.options?.skipErrorHandler) {
      return;
    }
    const { options } = req;
    const { getResponse } = options;
    const resData = getResponse ? res.data : res;
    if (['B0001', 'B0002'].includes(resData?.code)) {
      locationServices.replace(paths.loginPath);
      localStorage.removeItem(TOKEN_KEY);
      notificationError({
        message: '提示',
        description: '请重新登录',
      });
      return;
    }
    if (resData?.code != '00000') {
      notificationError({
        message: '提示',
        description: resData?.message,
      });
    }
  });

  // Add user custom middleware
  const customMiddlewares = requestConfig.middleware || [];
  customMiddlewares.forEach((mw) => {
    requestMethodInstance.use(mw);
  });

  // Add user custom interceptors
  const requestInterceptors = requestConfig.requestInterceptors || [];
  const responseInterceptors = requestConfig.responseInterceptors || [];
  requestInterceptors.forEach((ri) => {
    requestMethodInstance.interceptors.request.use(ri);
  });
  responseInterceptors.forEach((ri) => {
    requestMethodInstance.interceptors.response.use(ri);
  });

  return requestMethodInstance;
};

const request = (url: any, options: any) => {
  const requestMethod = getRequestMethod();

  const headers: {
    Authorization?: string;
  } = {};

  if (localStorage.getItem(TOKEN_KEY) && !options?.skipToken) {
    headers.Authorization = 'Bearer ' + localStorage.getItem(TOKEN_KEY) || '';
  }

  const resultURL = `${API_HOST}${url}`;
  return requestMethod(resultURL, {
    ...options,

    headers: { ...headers, ...options?.headers },
  });
};

function useHooksRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
): Result<TData, TParams> {
  return useRequest(service, { manual: true, ...options }, plugins);
}

export default request;

export { useHooksRequest as useRequest, buildResInitData };
