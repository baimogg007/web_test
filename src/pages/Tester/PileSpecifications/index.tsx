import { Button, Card, Table } from 'antd';
import { useRequest } from '@/shared/utils/request';
import BaseButton from '@/shared/components/BaseButton';
import useTableColumns from './useTableColumns';
import styles from './index.less';
import { useMount } from 'ahooks';
import NewOrEditModal from './NewOrEditModal';
import { pagePileSpecifications } from '@/api/Gz/PileSpecifications';
import React, { useState } from 'react';
import { paginationConfig } from '@/shared/config/config';

const AccountManage = () => {
  const [current, setCurrent] = useState(1);

  const {
    runAsync: getListAPI,
    data: listResData,
    loading: getListLoading,
  } = useRequest(pagePileSpecifications);
  const list = (listResData?.data?.list ?? []) as Gz.PileSpecificationsVO[];

  const getList = () => {
    getListAPI({
      query: {
        pageSize: 10,
        pageNum: current,
      },
    });
  };

  useMount(() => {
    getList();
  });

  const columns = useTableColumns(getList, current);

  return (
    <div>
      <NewOrEditModal reloadList={getList}>
        <BaseButton className={styles.addButton}>添加规格</BaseButton>
      </NewOrEditModal>
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
              setCurrent(args.pageNum);
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
