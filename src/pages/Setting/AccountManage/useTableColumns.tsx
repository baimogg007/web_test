import { Space } from 'antd';
import NewOrEditModal from './NewOrEditModal';
import DeleteModal from '@/shared/components/DeleteModal';
import { deleteAccount } from '@/api/Gz/Account';

const useTableProps = (reloadList: () => void, currentPage: number) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render(val: Gz.AccountVO, _: Gz.AccountVO, index: number) {
        return `${currentPage == 1 ? '' : currentPage - 1}${index + 1}`;
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: Gz.AccountVO['id']) => {
        return (
          <Space size={16}>
            <NewOrEditModal id={id} reloadList={reloadList}>
              <span className="operate">修改密码</span>
            </NewOrEditModal>
            <DeleteModal
              requestAPI={deleteAccount}
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
