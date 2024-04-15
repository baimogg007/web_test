// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 公司列表 GET /admin/companies */
export async function listCompany(options?: { [key: string]: any }) {
  return request<Gz.ResultListCompanyVO>('/admin/companies', {
    method: 'GET',
    ...(options || {}),
  });
}
