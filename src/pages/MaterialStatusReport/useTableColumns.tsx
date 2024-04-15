const useTableProps = (list: Gz.ReportVO[]) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render(val: Gz.ReportVO['id'], _: Gz.ReportVO, index: number) {
        return list.length - index;
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
  ];

  return columns;
};

export default useTableProps;
