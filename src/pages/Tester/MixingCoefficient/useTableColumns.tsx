import NewOrEditModal from './NewOrEditModal';

const useTableProps = (reloadList: () => void, pageInfo: PaginationType) => {
  const columns = [
    {
      title: '规格',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: '搅拌系数',
      dataIndex: 'stirringCoefficient',
      key: 'stirringCoefficient',
    },
    {
      title: '操作',
      render: (data: Gz.StirringCoefficientVO) => {
        return (
          <NewOrEditModal data={data} reloadList={reloadList}>
            <span className="operate">修改</span>
          </NewOrEditModal>
        );
      },
    },
  ];

  return columns;
};

export default useTableProps;
