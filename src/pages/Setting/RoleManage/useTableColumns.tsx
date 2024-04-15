import { Space } from 'antd';
import NewOrEditRoleModal from './NewOrEditRoleModal';
import DeleteModal from '@/shared/components/DeleteModal';
import { deleteRole } from '@/api/Gz/Role';
import SuccessIcon from '@/assets/success.svg';

const useTableProps = (reloadList: () => void) => {
  const renderAuth = (data: Gz.RolePermissionVO, key: string) => {
    const _p = data.permissions;
    const _auth = _p.find((item) => item.value == key);

    return _auth ? <SuccessIcon /> : '-';
  };
  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '报料',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'client.reporting');
      },
    },
    {
      title: '搅拌',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'client.stir');
      },
    },
    {
      title: '实时生产情况',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.production');
      },
    },
    {
      title: '产量情况',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.yield');
      },
    },
    {
      title: '历史记录',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.history');
      },
    },
    {
      title: '管模信息库',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.mould.information');
      },
    },
    {
      title: '试验员',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.trial');
      },
    },
    {
      title: '管理设置',
      render(data: Gz.RolePermissionVO) {
        return renderAuth(data, 'admin.manager');
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render(id: Gz.RolePermissionVO['id']) {
        return (
          <Space size={16}>
            <NewOrEditRoleModal id={id} reloadList={reloadList}>
              <span className="operate">修改</span>
            </NewOrEditRoleModal>
            <DeleteModal
              requestAPI={deleteRole}
              requestParams={{ id }}
              requestSuccess={reloadList}
            >
              <span className="operate">删除</span>
            </DeleteModal>
          </Space>
        );
      },
    },
  ];

  return columns;
};

export default useTableProps;
