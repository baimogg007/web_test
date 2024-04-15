import dayjs from 'dayjs';

const useTableProps = (pageInfo: PaginationType) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render(
        val: Gz.ProductionHistoryVO,
        _: Gz.ProductionHistoryVO,
        index: number,
      ) {
        return (
          pageInfo.total - (pageInfo.pageNum - 1) * pageInfo.pageSize - index
        );
      },
    },
    {
      title: '模具号',
      dataIndex: 'mouldCode',
      key: 'mouldCode',
    },
    {
      title: '桩规格',
      dataIndex: 'pileSpecificationsName',
      key: 'pileSpecificationsName',
    },
    {
      title: '模具长度',
      dataIndex: 'mouldLength',
      key: 'mouldLength',
    },
    {
      title: '配桩长度',
      dataIndex: 'pileSpecificationsLength',
      key: 'pileSpecificationsLength',
    },
    {
      title: '布料线号',
      dataIndex: 'lineNumber',
      key: 'lineNumber',
    },
    {
      title: '编号',
      dataIndex: 'uniqueNumber',
      key: 'uniqueNumber',
      render(val: Gz.ProductionHistoryVO['uniqueNumber']) {
        return val.map((num, index) => <div key={index}>{num}</div>);
      },
    },
    {
      title: '生产时间',
      dataIndex: 'reportDateTime',
      key: 'reportDateTime',
      render(val: Gz.ProductionHistoryVO['reportDateTime']) {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  return columns;
};

export default useTableProps;
