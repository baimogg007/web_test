import { Card, Pagination, Table } from 'antd';
import { useRequest } from '@/shared/utils/request';
import { pageAccount } from '@/api/Gz/Account';
import BaseButton from '@/shared/components/BaseButton';
import useTableColumns from './useTableColumns';
import styles from './index.less';
import { useMount } from 'ahooks';
import React, { useState } from 'react';
import NewOrEditModal from './NewOrEditModal';
import { paginationConfig } from '@/shared/config/config';

const AccountManage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    runAsync: getAccountListAPI,
    data: accountListResData,
    loading: getAccountListLoading,
  } = useRequest(pageAccount);
  const accountList = (accountListResData?.data?.list ?? []) as Gz.AccountVO[];

  const getList = () => {
    getAccountListAPI({
      query: {
        pageSize: 10,
        pageNum: currentPage,
      },
    });
  };
  useMount(() => {
    getList();
  });

  const columns = useTableColumns(getList, currentPage);

  return (
    <div>
      <NewOrEditModal
        id={0}
        reloadList={() => {
          getList();
        }}
      >
        <BaseButton className={styles.addAccountButton}>添加账户</BaseButton>
      </NewOrEditModal>
      <Card>
        <Table
          columns={columns}
          dataSource={accountList}
          rowKey="id"
          bordered
          pagination={paginationConfig(
            accountListResData?.data?.total,
            (args) => {
              setCurrentPage(args.pageNum);
              getAccountListAPI({
                query: {
                  pageSize: args.pageSize,
                  pageNum: args.pageNum,
                },
              });
            },
          )}
          loading={{
            spinning: !!getAccountListLoading,
          }}
        />
      </Card>
    </div>
  );
};

export default AccountManage;
