import type {
  Context,
  RequestOptionsInit,
  OnionMiddleware,
  RequestInterceptor,
  ResponseInterceptor,
} from 'umi-request';
// import * as Sentry from '@sentry/react';
import { notificationSuccess } from '@/shared/services/notification';
import { loginPath } from '@/routes/const/paths';
import ErrorShowType from './consts/ErrorShowType';
import {
  SUCCESS,
  NOT_LOGIN,
  NO_AUTH,
  SECTION_BUSINESS_EXCEPTION,
  GLOBAL_BUSINESS_EXCEPTION,
  SERVER_EXCEPTION,
  RPC_CODE,
  GOOGLE_ERROR_CODE,
} from './consts/responseCode';

export interface ErrorInfoStructure {
  success: boolean;
  data?: any;
  errorCode?: string;
  messageDetails?: string;
  message?: string;
  redirectPage?: string;
  showType?: ErrorShowType;
  host?: string;
  [key: string]: any;
}

export interface RequestConfig extends RequestOptionsInit {
  errorConfig: {
    errorPage?: string;
    adaptor: (resData: any, ctx: Context) => ErrorInfoStructure;
  };
  middleware?: OnionMiddleware[];
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
}

const requestConfig: RequestConfig = {
  errorConfig: {
    adaptor: (resData, ctx) => {
      const { req } = ctx;
      const resultData: ErrorInfoStructure = {
        success: true,
      };
      if (req.options.responseType === 'blob') {
        return resultData;
      }
      const { code, message } = resData;

      const showSuccessTips = req.options?.showSuccessTips;

      switch (code) {
        case SUCCESS:
          if (showSuccessTips) {
            notificationSuccess({ message: '操作成功' });
          }
          // do nothing
          break;
        // case SECTION_BUSINESS_EXCEPTION:
        //   resultData.success = false;
        //   resultData.showType = ErrorShowType.SILENT;
        //   resultData.formErrorSpace = req.options?.formErrorSpace;
        //   resultData.message = message;
        //   // resultData.messageDetails = messageDetails;
        //   break;
        // case RPC_CODE:
        // case GLOBAL_BUSINESS_EXCEPTION:
        // case GOOGLE_ERROR_CODE:
        //   resultData.success = false;
        //   resultData.showType = ErrorShowType.ERROR_MESSAGE;
        //   resultData.message = message;
        //   // resultData.messageDetails = messageDetails;
        //   break;
        case SERVER_EXCEPTION:
          resultData.success = false;
          resultData.showType = ErrorShowType.ERROR_MESSAGE;
          resultData.message = message;
        // resultData.messageDetails = messageDetails;

        // Sentry.captureMessage(`SERVER_EXCEPTION-${traceId}`, {
        //   level: 'error',
        //   fingerprint: [traceId],
        //   extra: {
        //     message,
        //     traceId,
        //     url: req.url,
        //   },
        // });
        // break;
        case NO_AUTH:
        case NOT_LOGIN:
          resultData.success = false;
          resultData.showType = ErrorShowType.REDIRECT;
          resultData.redirectPage = loginPath;
          break;
        default:
          resultData.success = false;
          resultData.showType = ErrorShowType.ERROR_MESSAGE;
          resultData.message = message;
          break;
      }
      return resultData;
    },
  },
};

export default requestConfig;
