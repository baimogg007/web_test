// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 角色详情 GET /admin/roles/${param0} */
export async function getRolePermissionById(
  params: {
    // path
    /** 角色编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultRolePermissionVO>(`/admin/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新角色 PUT /admin/roles/${param0} */
export async function updateRole(
  params: {
    // path
    /** 角色编号 */
    id: number;
  },
  body: Gz.RoleParam,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /admin/roles/${param0} */
export async function deleteRole(
  params: {
    // path
    /** 角色编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/roles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取角色列表 GET /admin/roles */
export async function listRole(options?: { [key: string]: any }) {
  return request<Gz.ResultListRoleVO>('/admin/roles', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增角色 POST /admin/roles */
export async function insertRole(
  body: Gz.RoleParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultLong>('/admin/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页角色 GET /admin/roles/page */
export async function pageRole(
  params: {
    // query
    query: Gz.PageQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVORolePermissionVO>('/admin/roles/page', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}
