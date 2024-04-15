import { deletePileSpecifications } from '@/api/Gz/PileSpecifications';
import DeleteModal from '@/shared/components/DeleteModal';
import { Space } from 'antd';
import NewOrEditModal from './NewOrEditModal';

const useTableProps = (reloadList: () => void, current: number) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render(
        val: Gz.PileSpecificationsVO,
        _: Gz.PileSpecificationsVO,
        index: number,
      ) {
        return `${current == 1 ? '' : current - 1}${index + 1}`;
      },
    },
    {
      title: '代号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '预应力',
      dataIndex: 'prestress',
      key: 'prestress',
    },
    {
      title: '直径',
      dataIndex: 'diameter',
      key: 'diameter',
    },
    {
      title: '壁厚',
      dataIndex: 'wallThickness',
      key: 'wallThickness',
    },
    {
      title: '桩规格',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: '桩规格简写',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id: Gz.PileSpecificationsVO['id']) => {
        return (
          <Space size={16}>
            <NewOrEditModal id={id} reloadList={reloadList}>
              <span className="operate">修改</span>
            </NewOrEditModal>
            <DeleteModal
              requestAPI={deletePileSpecifications}
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
