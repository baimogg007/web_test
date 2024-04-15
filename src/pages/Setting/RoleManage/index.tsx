import { Card, Table } from 'antd';
import { useRequest } from '@/shared/utils/request';
import BaseButton from '@/shared/components/BaseButton';
import useTableColumns from './useTableColumns';
import styles from './index.less';
import { useMount } from 'ahooks';
import React, { useState } from 'react';
import { deleteRole, pageRole } from '@/api/Gz/Role';
import NewOrEditRoleModal from './NewOrEditRoleModal';
import { paginationConfig } from '@/shared/config/config';

const RoleManage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    runAsync: getRoleInfoListAPI,
    data: roleInfoListResData,
    loading: getRoleInfoListLoading,
  } = useRequest(pageRole);
  const roleInfoList = (roleInfoListResData?.data.list ??
    []) as Gz.RolePermissionVO[];

  const fetchData = () => {
    getRoleInfoListAPI({
      query: {
        pageSize: 10,
        pageNum: currentPage,
      },
    });
  };

  useMount(() => {
    fetchData();
  });

  const columns = useTableColumns(fetchData);

  return (
    <div>
      <NewOrEditRoleModal reloadList={fetchData}>
        <BaseButton className={styles.addAccountButton}>添加角色</BaseButton>
      </NewOrEditRoleModal>
      <Card>
        <Table
          columns={columns}
          dataSource={roleInfoList}
          rowKey="id"
          bordered
          pagination={paginationConfig(
            roleInfoListResData?.data.total,
            (args) => {
              getRoleInfoListAPI({
                query: {
                  pageSize: args.pageSize,
                  pageNum: args.pageNum,
                },
              }).then(() => {
                setCurrentPage(args.pageNum);
              });
            },
          )}
          loading={{
            spinning: !!getRoleInfoListLoading,
          }}
        />
      </Card>
    </div>
  );
};

export default RoleManage;
