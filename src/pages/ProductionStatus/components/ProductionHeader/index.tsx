import { Space } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import type { InfoType } from '@/shared/hooks/useWebSocketApi';

const ProductionHeader = ({
  dataSource = {
    planQuantity: 0,
    actualQuantity: 0,
    quantityCompletedRate: '',
    planMeters: 0,
    actualMeters: 0,
    metersCompletedRate: '',
  },
}: {
  dataSource: InfoType;
}) => {
  const {
    quantityCompletedRate,
    metersCompletedRate,
    planQuantity,
    actualQuantity,
    planMeters,
    actualMeters,
  } = dataSource;

  const dataList = [
    {
      plannedLabel: '计划根数',
      plannedNum: planQuantity,
      practicalLabel: '当前根数',
      practicalNum: actualQuantity,
      rate: quantityCompletedRate,
      cls: styles.green,
    },
    {
      plannedLabel: '计划米数',
      plannedNum: planMeters,
      practicalLabel: '当前米数',
      practicalNum: actualMeters,
      rate: metersCompletedRate,
      cls: styles.red,
    },
  ];

  return (
    <Space size={23} className={styles.productionHeader}>
      {dataList.map((item, i) => (
        <div key={i} className={classNames(styles.productionBox, item.cls)}>
          <div className={styles.productionItem}>
            <div>{item.plannedLabel}</div>
            <div>{item.plannedNum}</div>
          </div>
          <div className={styles.productionItem}>
            <div>{item.practicalLabel}</div>
            <div>{item.practicalNum}</div>
          </div>
          <div className={styles.productionItem}>
            <div>完成率</div>
            <div>{`${parseInt(item.rate, 10) * 100} %`}</div>
          </div>
        </div>
      ))}
    </Space>
  );
};

export default ProductionHeader;
