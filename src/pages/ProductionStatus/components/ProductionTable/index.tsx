import { Card, Table } from 'antd';
import useTableColumns from './useTableColumns';
import type { ListRecordType } from '@/shared/hooks/useWebSocketApi';
import { forEach, groupBy, isEmpty } from 'lodash';

export type RecordType = ListRecordType & { keyId: string; rowSpan: number };

const formatTableData = (dataSource: ListRecordType[]): RecordType[] => {
  let resData: RecordType[] = [];

  if (!isEmpty(dataSource)) {
    const accountTypeGroupMap = groupBy(dataSource, 'pileSpecificationsName');
    forEach(accountTypeGroupMap, (pileGroup, pileName) => {
      const nextGroupList: RecordType[] = pileGroup.map((item, i) => ({
        ...item,
        rowSpan: i === 0 ? pileGroup.length : 0,
        keyId: `${pileName}-${i}`,
      }));
      resData = [...resData, ...nextGroupList];
    });

    return resData;
  }

  return resData;
};

const ProductionTable = ({ dataSource }: { dataSource: ListRecordType[] }) => {
  const columns = useTableColumns();

  return (
    <Card>
      <Table
        columns={columns}
        dataSource={formatTableData(dataSource)}
        pagination={false}
        rowKey="keyId"
        bordered
      />
    </Card>
  );
};

export default ProductionTable;
