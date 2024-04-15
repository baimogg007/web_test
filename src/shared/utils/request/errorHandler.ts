import type { Context } from 'umi-request';
import { getDvaApp } from 'umi';
import locationServices from '@/shared/services/locationServices';
import { globalTypes } from '@/models/global';
import ErrorShowType from './consts/ErrorShowType';
import type { ErrorInfoStructure } from './requestConfig';
import requestConfig from './requestConfig';
import instanceNotification from './instanceNotification';

export interface RequestError extends Error {
  data?: any;
  redirectPage?: string;
  info?: ErrorInfoStructure;
  request?: Context['req'];
  response?: Context['res'];
}

const DEFAULT_ERROR_PAGE = '/exception';

const codeMaps: Record<number, string> = {
  500: '服务端错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  400: '接口参数错误',
  404: '请求了不存在的接口',
  403: '无权限',
};

const errorHandler = (error: RequestError) => {
  // @ts-ignore
  if (error?.request?.options?.skipErrorHandler) {
    throw error;
  }
  console.log('errr', error);
  if (
    error.name === 'ResponseError' ||
    error.name === 'FetchError' ||
    error.name === 'RequestError'
  ) {
    // http error
    const httpStatusCode = error?.response?.status;
    if (httpStatusCode && httpStatusCode >= 400) {
      // eslint-disable-next-line no-param-reassign
      error.info = {
        success: false,
        showType: ErrorShowType.ERROR_MESSAGE,
        message: codeMaps[httpStatusCode],
      };
    }
  }

  const errorInfo: ErrorInfoStructure | undefined = error.info;

  if (errorInfo) {
    const message = errorInfo?.message;
    const errorCode = errorInfo?.code;
    const errorPage =
      errorInfo.redirectPage ||
      requestConfig.errorConfig?.errorPage ||
      DEFAULT_ERROR_PAGE;

    switch (errorInfo?.showType) {
      case ErrorShowType.SILENT:
        // eslint-disable-next-line no-case-declarations
        const store = getDvaApp()._store;
        store.dispatch({
          type: globalTypes.SAVE_SERVER_ERROR,
          payload: {
            errorNameSpace: errorInfo.formErrorSpace,
            message: errorInfo.message,
            messageDetails: errorInfo.messageDetails,
          },
        });
        break;
      case ErrorShowType.WARN_MESSAGE:
        instanceNotification({
          message: '提示',
          description: message,
        });
        break;
      case ErrorShowType.ERROR_MESSAGE:
        instanceNotification({
          message: '提示',
          description: message,
        });
        break;
      case ErrorShowType.REDIRECT:
        locationServices.push(errorPage, {
          query: { errorCode },
        });

        // redirect to error page
        break;
      default:
        instanceNotification({
          message: '提示',
          description: message,
        });
        break;
    }
  } else {
    instanceNotification({
      message: '提示',
      description: error.message || 'Request error, please retry.',
    });
  }
  throw error;
};

export default errorHandler;
