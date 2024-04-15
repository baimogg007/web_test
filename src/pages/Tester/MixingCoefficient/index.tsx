import { Card, Table } from 'antd';
import { useRequest } from '@/shared/utils/request';
import { pageAccount } from '@/api/Gz/Account';
import BaseButton from '@/shared/components/BaseButton';
import useTableColumns from './useTableColumns';
import styles from './index.less';
import { useMount } from 'ahooks';
import React from 'react';
import NewOrEditModal from './NewOrEditModal';
import { paginationConfig } from '@/shared/config/config';
import { pageStirringCoefficient } from '@/api/Gz/PileSpecifications';

const AccountManage = () => {
  const paginationRef = React.useRef<PaginationType>({
    pageNum: 1,
    pageSize: 10,
  });

  const {
    runAsync: getListAPI,
    data: listResData,
    loading: getListLoading,
  } = useRequest(pageStirringCoefficient);
  const list = (listResData?.data?.list ?? []) as Gz.StirringCoefficientVO[];

  const getList = () => {
    getListAPI({
      query: {
        pageSize: paginationRef?.current.pageSize,
        pageNum: paginationRef?.current.pageNum,
      },
    });
  };
  useMount(() => {
    getList();
  });

  const columns = useTableColumns(getList, paginationRef?.current);

  return (
    <div>
      {/* <NewOrEditModal reloadList={getList}>
        <BaseButton className={styles.addAccountButton}>添加规格</BaseButton>
      </NewOrEditModal> */}
      <Card>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          bordered
          pagination={paginationConfig(listResData?.data?.total, (args) => {
            getListAPI({
              query: {
                pageSize: args.pageSize,
                pageNum: args.pageNum,
              },
            }).then(() => {
              paginationRef.current = args;
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

export default AccountManage;
