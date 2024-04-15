// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 更新密码 PUT /admin/accounts/${param0}/password */
export async function updatePassword(
  params: {
    // path
    /** 账户编号 */
    id: number;
  },
  body: Gz.PasswordParam,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/accounts/${param0}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 新增账户 POST /admin/accounts */
export async function insertAccount(
  body: Gz.AccountParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultLong>('/admin/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出 POST /admin/accounts/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Gz.ResultInteger>('/admin/accounts/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录 POST /admin/accounts/login */
export async function login(
  body: Gz.LoginParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultAdminLoginVO>('/admin/accounts/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 账户详情 GET /admin/accounts/${param0} */
export async function getAccountById(
  params: {
    // path
    /** 账户编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultAccountVO>(`/admin/accounts/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除账户 DELETE /admin/accounts/${param0} */
export async function deleteAccount(
  params: {
    // path
    /** 账户编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/accounts/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页账户 GET /admin/accounts/page */
export async function pageAccount(
  params: {
    // query
    query: Gz.PageQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVOAccountVO>('/admin/accounts/page', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}
