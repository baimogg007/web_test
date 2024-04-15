import { YieldRecordType } from '.';

const useTableProps = () => {
  const columns = [
    {
      title: '管桩规格',
      dataIndex: 'pileSpecificationsName',
      key: 'pileSpecificationsName',
      onCell: ({ summaryFlag, rowSpan }: YieldRecordType) => ({
        colSpan: summaryFlag ? 2 : 1,
        rowSpan: rowSpan ?? 0,
      }),
    },
    {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
      onCell: ({ summaryFlag }: YieldRecordType) => ({
        colSpan: summaryFlag ? 0 : 1,
      }),
    },
    {
      title: '本日产量',
      children: [
        {
          title: '根数',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: '米数',
          dataIndex: 'meters',
          key: 'meters',
        },
      ],
    },
  ];

  return columns;
};

export default useTableProps;
