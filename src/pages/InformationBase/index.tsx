import { Card, Form, Input, Space, Table, Upload, UploadProps } from 'antd';
import { useRequest } from '@/shared/utils/request';
import BaseButton from '@/shared/components/BaseButton';
import useTableColumns, { isBorrowed } from './useTableColumns';
import styles from './index.less';
import { paginationConfig } from '@/shared/config/config';
import React, { Key, useState } from 'react';
import { useMount } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';
import NewOrEditModal from './NewOrEditModal';
import { isEmpty, omit } from 'lodash';
import {
  importMould,
  pageMould,
  updateBatchBorrowState,
  updateBatchEnabled,
} from '@/api/Gz/Mould';
import { notificationError } from '@/shared/services/notification';
import { TOKEN_KEY, API_HOST } from '@/shared/const';

const InformationBase = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<Key[]>([]);
  const [pagination, setPagination] = React.useState<PaginationType>({
    pageNum: 1,
    pageSize: 10,
    totalPage: 0,
    total: 0,
  });

  const {
    runAsync: getListAPI,
    data: listResData,
    loading: getListLoading,
  } = useRequest(pageMould);
  const list = (listResData?.data?.list ?? []) as Gz.MouldVO[];

  const getList = (params?: Gz.MouldQuery) => {
    getListAPI({
      query: {
        pageSize: pagination.pageSize,
        pageNum: pagination.pageNum,
        ...(params ?? {}),
      },
    }).then((res) => {
      if (res.data) {
        setPagination(omit(res.data, 'list') as PaginationType);
      }
    });
  };
  useMount(() => {
    getList();
  });

  const onBorrowStateChange = (id: number) => {
    const nextKeys = selectedRowKeys.filter((val) => val !== id);
    setSelectedRowKeys(nextKeys);
  };

  const columns = useTableColumns(getList, pagination, onBorrowStateChange);

  const {
    runAsync: importMouldAPI,
    data: accountListResData,
    loading: importMouldLoading,
  } = useRequest(importMould);

  const {
    runAsync: updateBatchEnabled1API,
    loading: updateBatchEnabled1Loading,
  } = useRequest(updateBatchEnabled);

  const {
    runAsync: updateBatchBorrowState1API,
    loading: updateBatchBorrowState1Loading,
  } = useRequest(updateBatchBorrowState);

  const props: UploadProps = {
    name: 'file',
    headers: { Authorization: localStorage.getItem(TOKEN_KEY) || '' },
    action: `${API_HOST}/admin/moulds/import`,
    showUploadList: false,
    accept: 'xslx',
    onChange(changeParam) {
      console.log(changeParam.file);
      if (
        changeParam.file?.response &&
        changeParam.file?.response?.code != '00000'
      ) {
        notificationError({
          message: '提示',
          description: changeParam.file?.response?.message,
        });
        return;
      }
      getList();
    },
  };

  const onSearch = ({ code }: { code: number }) => {
    getList({ code });
  };

  const onReset = () => {
    form.resetFields();
    getList();
  };

  const onSelectChange = (selectedRowKey: Key[]) => {
    setSelectedRowKeys(selectedRowKey);
  };

  // 批量切换状态
  const onBatchStatus = () => {
    updateBatchEnabled1API({ ids: selectedRowKeys as number[] }).then((res) => {
      setSelectedRowKeys([]);
      getList();
    });
  };

  // 批量借出
  const onBatchBorrow = () => {
    updateBatchBorrowState1API(
      { borrowState: 1 },
      { ids: selectedRowKeys as number[] },
    ).then((res) => {
      setSelectedRowKeys([]);
      getList();
    });
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="search-form"
        onFinish={onSearch}
      >
        <Space size={20} align="end">
          <Form.Item name="code" label="模具号">
            <Input />
          </Form.Item>
          <Space size={20}>
            <BaseButton htmlType="submit" loading={!!getListLoading}>
              搜索
            </BaseButton>
            <BaseButton ghost onClick={onReset} loading={!!getListLoading}>
              重置
            </BaseButton>
          </Space>
        </Space>
      </Form>
      <Space size={12} className={styles.addButton}>
        <NewOrEditModal reloadList={getList}>
          <BaseButton>添加</BaseButton>
        </NewOrEditModal>
        <Upload className={styles.upload} {...props}>
          <BaseButton loading={importMouldLoading} icon={<PlusOutlined />}>
            导入
          </BaseButton>
        </Upload>
        <BaseButton
          loading={updateBatchEnabled1Loading}
          disabled={isEmpty(selectedRowKeys)}
          onClick={onBatchStatus}
        >
          切换状态
        </BaseButton>
        <BaseButton
          loading={updateBatchBorrowState1Loading}
          disabled={isEmpty(selectedRowKeys)}
          onClick={onBatchBorrow}
        >
          借出
        </BaseButton>
      </Space>
      <Card>
        <Table
          columns={columns}
          dataSource={list}
          rowSelection={{
            columnWidth: 52,
            selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps: (record) => {
              return {
                disabled: isBorrowed(record),
              };
            },
          }}
          rowKey="id"
          bordered
          pagination={paginationConfig(listResData?.data?.total, (args) => {
            getList({
              pageSize: args.pageSize,
              pageNum: args.pageNum,
            });
          })}
          loading={{
            spinning: !!getListLoading,
          }}
        />
      </Card>
    </div>
  );
};

export default InformationBase;
