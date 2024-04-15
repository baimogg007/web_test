// @ts-ignore
/* eslint-disable */
import request from '@/shared/utils/request';

/** 模具详情 GET /admin/moulds/${param0} */
export async function getMouldById(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultMouldVO>(`/admin/moulds/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新模具 PUT /admin/moulds/${param0} */
export async function updateMould(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  body: Gz.MouldParam,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/moulds/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除模具 DELETE /admin/moulds/${param0} */
export async function deleteMould(
  params: {
    // path
    /** 编号 */
    id: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/moulds/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新启用状态 PUT /admin/moulds/${param0}/${param1}/enabled */
export async function updateEnabled(
  params: {
    // path
    /** 编号 */
    id: number;
    /** 启用状态:0->未启用,1->启用 */
    enabled: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, enabled: param1, ...queryParams } = params;
  return request<Gz.ResultInteger>(
    `/admin/moulds/${param0}/${param1}/enabled`,
    {
      method: 'PUT',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新借用状态 PUT /admin/moulds/${param0}/${param1}/borrow */
export async function updateBorrowState(
  params: {
    // path
    /** 编号 */
    id: number;
    /** 借出状态:0->未借出,1->借出 */
    borrowState: number;
  },
  options?: { [key: string]: any },
) {
  const { id: param0, borrowState: param1, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/moulds/${param0}/${param1}/borrow`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 批量更新借用状态 PUT /admin/moulds/${param0}/borrow/batch */
export async function updateBatchBorrowState(
  params: {
    // path
    /** 借出状态:0->未借出,1->借出 */
    borrowState: number;
  },
  body: Gz.BatchOperateParam,
  options?: { [key: string]: any },
) {
  const { borrowState: param0, ...queryParams } = params;
  return request<Gz.ResultInteger>(`/admin/moulds/${param0}/borrow/batch`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 批量更新启用状态 PUT /admin/moulds/enabled/batch */
export async function updateBatchEnabled(
  body: Gz.BatchOperateParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultInteger>('/admin/moulds/enabled/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增模具 POST /admin/moulds */
export async function insertMould(
  body: Gz.MouldParam,
  options?: { [key: string]: any },
) {
  return request<Gz.ResultLong>('/admin/moulds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入模具 POST /admin/moulds/import */
export async function importMould(
  body: {
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

  return request<Gz.ResultInteger>('/admin/moulds/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });
}

/** 模具分页 GET /admin/moulds/page */
export async function pageMould(
  params: {
    // query
    query: Gz.MouldQuery;
  },
  options?: { [key: string]: any },
) {
  return request<Gz.ResultPageVOMouldVO>('/admin/moulds/page', {
    method: 'GET',
    params: {
      ...params,
      query: undefined,
      ...params['query'],
    },
    ...(options || {}),
  });
}
