import BaseButton from '@/shared/components/BaseButton';
import { Form, Space, DatePicker, Card, Table } from 'antd';
import useTableColumns from './useTableColumns';
import styles from './index.less';
import { useRequest } from '@/shared/utils/request';
import Export from '@/assets/export.svg';
import { listYield, statisticsYield } from '@/api/Gz/Yield';
import dayjs from 'dayjs';
import { useMount } from 'ahooks';
import { findIndex, forEach, groupBy, isEmpty } from 'lodash';
import classNames from 'classnames';
import useYieldTableColumns from './useYieldTableColumns';
import { downloadFile } from '@/shared/utils';
import { API_HOST } from '@/shared/const';
import { useState } from 'react';

export type YieldRecordType = Gz.ProductionPlanningRecordVO & {
  rowSpan: number;
  keyId: number;
};

const formatTableData = (
  dataSource: Gz.ProductionPlanningRecordVO[],
): YieldRecordType[] => {
  let resData: YieldRecordType[] = dataSource.map((item, index) => ({
    ...item,
    keyId: index,
    rowSpan: item.summaryFlag ? 1 : 0,
  }));

  if (!isEmpty(dataSource)) {
    const oriDataSource = dataSource.filter((item) => !!item.length);
    const accountTypeGroupMap = groupBy(
      oriDataSource,
      'pileSpecificationsName',
    );
    forEach(accountTypeGroupMap, (pileGroup, pileName) => {
      const dataIndex = findIndex(dataSource, {
        pileSpecificationsName: pileName,
      });

      const nextGroupList: YieldRecordType = {
        ...resData[dataIndex],
        rowSpan: pileGroup.length,
      };
      resData.splice(dataIndex, 1, nextGroupList);
    });
  }

  return resData;
};

const yesterday = dayjs().subtract(1, 'day');

const initialValues = { date: yesterday };

const productionHistory = () => {
  const [form] = Form.useForm();

  const {
    runAsync: getStaticsListAPI,
    data: staticsListResData,
    loading: getStaticsListLoading,
  } = useRequest(statisticsYield);
  const staticsList = (staticsListResData?.data ?? []) as Gz.YieldVO[];

  const {
    runAsync: getYieldListAPI,
    data: yieldListResData,
    loading: getYieldListLoading,
  } = useRequest(listYield);

  const yieldList = (yieldListResData?.data ??
    []) as Gz.ProductionPlanningRecordVO[];

  const getList = (values: { date: dayjs.Dayjs }) => {
    const date = dayjs(values.date).startOf('day').valueOf();
    getStaticsListAPI({ date });
    getYieldListAPI({ date });
  };

  useMount(() => {
    getList(initialValues);
  });

  const onSearch = (values: any) => {
    getList(values);
  };

  const onReset = () => {
    form.resetFields();
    getList(initialValues);
  };

  const [exportLoading, setExportLoading] = useState<boolean>();
  const exportExcel = async () => {
    setExportLoading(true);
    const values = form.getFieldsValue();
    const date = dayjs(values.date).startOf('day').valueOf();
    await downloadFile(`${API_HOST}/admin/yields/export?date=${date}`, {});
    setExportLoading(false);
  };

  const columns = useTableColumns();
  const yieldColumns = useYieldTableColumns();

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="search-form"
        onFinish={onSearch}
        initialValues={initialValues}
      >
        <Space size={20} align="end">
          <Form.Item name="date" label="日期">
            <DatePicker allowClear={false} />
          </Form.Item>
          <Space size={20}>
            <BaseButton
              htmlType="submit"
              loading={!!(getStaticsListLoading || getYieldListLoading)}
            >
              搜索
            </BaseButton>
            <BaseButton
              ghost
              onClick={onReset}
              loading={!!(getStaticsListLoading || getYieldListLoading)}
            >
              重置
            </BaseButton>
          </Space>
        </Space>
      </Form>
      <Card>
        <Table
          className={classNames({
            [styles.grayFirstColumn]: !isEmpty(staticsList),
          })}
          columns={columns}
          dataSource={staticsList}
          rowKey="classGroupId"
          bordered
          pagination={false}
          loading={{
            spinning: !!getStaticsListLoading,
          }}
        />
      </Card>
      <div className={styles.detailedYield}>当日详细产量</div>
      <BaseButton
        loading={exportLoading}
        onClick={exportExcel}
        className={styles.exportButton}
      >
        <Export />
        导出表格
      </BaseButton>
      <Card>
        <Table
          columns={yieldColumns}
          dataSource={formatTableData(yieldList)}
          rowKey="keyId"
          bordered
          pagination={false}
          loading={{
            spinning: !!getYieldListLoading,
          }}
        />
      </Card>
    </div>
  );
};

export default productionHistory;
