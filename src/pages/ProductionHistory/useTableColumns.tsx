const useTableProps = () => {
  const columns = [
    {
      title: '',
      dataIndex: 'classGroupName',
      key: 'classGroupName',
    },
    {
      title: '当日条数',
      dataIndex: 'dayQuantity',
      key: 'dayQuantity',
    },
    {
      title: '当日米数',
      dataIndex: 'dayMeters',
      key: 'dayMeters',
    },
    {
      title: '当日计划完成率',
      dataIndex: 'dayCompleteRate',
      key: 'dayCompleteRate',
      render(value: Gz.YieldVO['dayCompleteRate']) {
        return `${parseInt(value, 10) * 100} %`;
      },
    },
    {
      title: '本月累计条数',
      dataIndex: 'monthQuantity',
      key: 'monthQuantity',
    },
    {
      title: '本月累计米数',
      dataIndex: 'motherMeter',
      key: 'motherMeter',
    },
    {
      title: '当月计划完成率',
      dataIndex: 'motherCompleteRate',
      key: 'motherCompleteRate',
      render(value: Gz.YieldVO['motherCompleteRate']) {
        return `${parseInt(value, 10) * 100} %`;
      },
    },
  ];

  return columns;
};

export default useTableProps;
