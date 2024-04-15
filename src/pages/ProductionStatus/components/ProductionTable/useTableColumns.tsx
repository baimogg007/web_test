import type { RecordType } from '.';

const useTableProps = () => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'pileSpecificationsName',
      key: 'pileSpecificationsName',
      render(
        val: RecordType['pileSpecificationsName'],
        _: RecordType,
        index: number,
      ) {
        return index + 1;
      },
    },
    {
      title: '管桩规格',
      dataIndex: 'pileSpecificationsName',
      key: 'pileSpecificationsName',
      onCell: ({ rowSpan }: RecordType) => ({ rowSpan }),
    },
    {
      title: '长度',
      dataIndex: 'pileSpecificationsLength',
      key: 'pileSpecificationsLength',
      // render(val: RecordType['pileSpecificationsLength']) {
      //   return val.join('+');
      // },
    },
    {
      title: '单轮生产计划',
      children: [
        {
          title: '根数',
          dataIndex: 'planQuantity',
          key: 'planQuantity',
          render(val: RecordType['planQuantity']) {
            return val || '/';
          },
        },
        {
          title: '米数',
          dataIndex: 'planMeters',
          key: 'planMeters',
          render(val: RecordType['planMeters']) {
            return val || '/';
          },
        },
      ],
    },
    {
      title: '当班实际生产情况',
      children: [
        {
          title: '根数',
          dataIndex: 'actualQuantity',
          key: 'actualQuantity',
        },
        {
          title: '米数',
          dataIndex: 'actualMeters',
          key: 'actualMeters',
        },
      ],
    },
    {
      title: '完成率',
      dataIndex: 'completedRate',
      key: 'completedRate',
      render(val: RecordType['completedRate']) {
        return val ? `${parseInt(val, 10) * 100} %` : '/';
      },
    },
    {
      title: '是否翻池',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return columns;
};

export default useTableProps;
