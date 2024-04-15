// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 桩规格详情 GET /admin/specifications/${param0} */
export async function getPileSpecificationsById(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultPileSpecificationsVO>(
    `/admin/specifications/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新桩规格 PUT /admin/specifications/${param0} */
export async function updatePileSpecifications(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  body: Gz.PileSpecificationsParam,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/specifications/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除桩规格 DELETE /admin/specifications/${param0} */
export async function deletePileSpecifications(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/specifications/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新搅拌系数 PUT /admin/specifications/${param0}/${param1} */
export async function updateStirringCoefficient(
  params: {
    // path
    /** 编号 */
    id: number;
    /** 搅拌系数 */
    stirringCoefficient: string;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, stirringCoefficient: param1, ...queryParams } = params;
  return request<Gz.ResultInteger>(
    `/admin/specifications/${param0}/${param1}`,
    {
      method: 'PUT',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 插入桩规格 POST /admin/specifications */
export async function insertPileSpecifications(
  body: Gz.PileSpecificationsParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultLong>('/admin/specifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搅拌系数分页 GET /admin/specifications/stirringCoefficient/page */
export async function pageStirringCoefficient(
  params: {
    // query
    query: Gz.PageQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVOStirringCoefficientVO>(
    '/admin/specifications/stirringCoefficient/page',
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

/** 桩规格分页 GET /admin/specifications/page */
export async function pagePileSpecifications(
  params: {
    // query
    query: Gz.PageQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVOPileSpecificationsVO>(
    '/admin/specifications/page',
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
