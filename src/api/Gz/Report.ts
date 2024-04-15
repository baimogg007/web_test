// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 报料列表 GET /admin/reports */
export async function listReport(options?: { [key: string]: any }) {
  return request<Gz.ResultListReportVO>('/admin/reports', {
    method: 'GET',
    ...(options || {}),
  });
}
