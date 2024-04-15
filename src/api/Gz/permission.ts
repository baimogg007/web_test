// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 权限列表 GET /admin/permissions */
export async function listPermission(options?: { [key: string]: any }) {
  return request<Gz.ResultListPermissionVO>('/admin/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}
