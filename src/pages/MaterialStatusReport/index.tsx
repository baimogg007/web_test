import { Card, Table } from 'antd';
import useTableColumns from './useTableColumns';
import { listReport } from '@/api/Gz/Report';
import { useMount } from 'ahooks';
import { useRequest } from '@/shared/utils/request';
import ArrowLeft from '@/assets/arrowLeft.svg';
import * as paths from '@/routes/const/paths';
import locationServices from '@/shared/services/locationServices';
import classNames from 'classnames';
import styles from './index.less';

const MaterialStatusReport = () => {
  const {
    runAsync: getListAPI,
    data: listResData,
    loading: getListLoading,
  } = useRequest(listReport);

  const list = (listResData?.data ?? []) as Gz.ReportVO[];

  useMount(() => {
    getListAPI();
  });

  const columns = useTableColumns(list);

  const backPage = () => {
    locationServices.push(paths.productionStatusPath);
  };

  return (
    <div>
      <div className={classNames('page-title', styles.pageTitleWrap)}>
        <div className={styles.backPageIcon} onClick={backPage}>
          <ArrowLeft />
        </div>
        <span>报料情况</span>
      </div>
      <Card>
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          rowKey="id"
          bordered
          loading={{
            spinning: !!getListLoading,
          }}
        />
      </Card>
    </div>
  );
};

export default MaterialStatusReport;
