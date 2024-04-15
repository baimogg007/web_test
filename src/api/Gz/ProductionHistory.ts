// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 历史记录分页 GET /admin/product/histories/page */
export async function pageProductHistory(
  params: {
    // query
    query: Gz.ProductHistoryQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVOProductionHistoryVO>(
    '/admin/product/histories/page',
    {
      method: 'GET',
      params: {
        ...params,
        query: undefined,
        ...params['query'],
      },
      ...(options || {}),
    },
  );
}
