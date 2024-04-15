import { Card, DatePicker, Form, Input, Select, Space, Table } from 'antd';
import { useRequest } from '@/shared/utils/request';
import useTableColumns from './useTableColumns';
import { useMount } from 'ahooks';
import React from 'react';
import { paginationConfig } from '@/shared/config/config';
import BaseButton from '@/shared/components/BaseButton';
import { pageProductHistory } from '@/api/Gz/ProductionHistory';
import dayjs from 'dayjs';
import { omit } from 'lodash';

const classList = [
  { label: '1班', value: 1 },
  { label: '2班', value: 2 },
];

const initialValues = { classGroupId: 1 };

const History = () => {
  const [form] = Form.useForm();

  const [pagination, setPagination] = React.useState<PaginationType>({
    pageNum: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0,
  });

  const {
    runAsync: getPageListAPI,
    data: pageListResData,
    loading: getPageListLoading,
  } = useRequest(pageProductHistory);
  const pageList = (pageListResData?.data?.list ??
    []) as Gz.ProductionHistoryVO[];

  const getList = (params: Gz.ProductHistoryQuery) => {
    getPageListAPI({
      query: {
        pageSize: pagination.pageSize,
        pageNum: pagination.pageNum,
        ...params,
      },
    }).then((res) => {
      if (res.data) {
        setPagination(omit(res.data, 'list') as PaginationType);
      }
    });
  };

  useMount(() => {
    getList(initialValues);
  });

  const columns = useTableColumns(pagination);

  const onSearch = (values: {
    classGroupId: number;
    uniqueNumber: number;
    duration?: dayjs.Dayjs;
  }) => {
    let startTime: number | undefined;
    let endTime: number | undefined;
    if (values.duration) {
      startTime = dayjs(values.duration).startOf('day').valueOf();
      endTime = dayjs(values.duration).endOf('day').valueOf();
    }
    const params = {
      startTime,
      endTime,
      ...omit(values, 'duration'),
    };

    getList(params);
  };

  const onReset = () => {
    form.resetFields();
    getList(initialValues);
  };

  return (
    <div>
      <div className="page-title">报料</div>
      <Form
        form={form}
        layout="vertical"
        className="search-form"
        onFinish={onSearch}
        initialValues={initialValues}
      >
        <Space size={20} align="end">
          <Form.Item name="duration" label="日期">
            <DatePicker />
          </Form.Item>
          <Form.Item name="classGroupId" label="班组">
            <Select options={classList} />
          </Form.Item>
          <Form.Item name="uniqueNumber" label="编号">
            <Input />
          </Form.Item>
          <Space size={20}>
            <BaseButton htmlType="submit" loading={!!getPageListLoading}>
              搜索
            </BaseButton>
            <BaseButton ghost onClick={onReset} loading={!!getPageListLoading}>
              重置
            </BaseButton>
          </Space>
        </Space>
      </Form>
      <Card>
        <Table
          columns={columns}
          dataSource={pageList}
          rowKey="id"
          bordered
          pagination={paginationConfig(pageListResData?.data?.total, (args) => {
            getList({
              pageSize: args.pageSize,
              pageNum: args.pageNum,
            });
          })}
          loading={{ spinning: !!getPageListLoading }}
        />
      </Card>
    </div>
  );
};

export default History;
