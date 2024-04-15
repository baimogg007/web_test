// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 产量列表 GET /admin/yields */
export async function listYield(
  params: {
    // query
    /** 日期 */
    date: number;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultListProductionPlanningRecordVO>('/admin/yields', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 统计产量 GET /admin/yields/statistics */
export async function statisticsYield(
  params: {
    // query
    /** 日期 */
    date: number;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultListYieldVO>('/admin/yields/statistics', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出产量 GET /admin/yields/export */
export async function exportYield(
  params: {
    // query
    /** 日期 */
    date: number;
  },
  options?: { [key: string]: any },
) {
  return request<any>('/admin/yields/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
