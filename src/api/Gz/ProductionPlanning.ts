// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 导入生产计划 POST /admin/production/plannings/import */
export async function importProductionPlanning(
  params: {
    // query
    /** 名称 */
    name: string;
    /** 生效日期 */
    effectiveDate: number;
  },
  body: {
    /** 文件 */
    file?: string;
  },
  files?: File[],
  options?: { [key: string]: any },
) {
  const formData = new FormData();
  if (files) {
    formData.append('file', files[0] || '');
  }
  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' ? JSON.stringify(item) : item,
      );
    }
  });

  return request<Gz.ResultLong>('/admin/production/plannings/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}
