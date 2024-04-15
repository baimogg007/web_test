import { Space } from 'antd';
import BaseButton from '@/shared/components/BaseButton';
import locationServices from '@/shared/services/locationServices';
import {
  materialStatusReportPath,
  adjustThePlanPath,
} from '@/routes/const/paths';
import styles from './index.less';

const OperateButtonGroup = () => {
  return (
    <div className={styles.operateButtonGroup}>
      <Space size={16}>
        <BaseButton
          onClick={() => locationServices.push(materialStatusReportPath)}
        >
          查看报料情况
        </BaseButton>
        <BaseButton onClick={() => locationServices.push(adjustThePlanPath)}>
          调整生产计划
        </BaseButton>
      </Space>
    </div>
  );
};

export default OperateButtonGroup;
