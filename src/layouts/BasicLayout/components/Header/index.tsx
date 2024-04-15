import { Layout } from 'antd';
import CustomerInfo from './CustomerInfo';
import styles from './index.less';

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <CustomerInfo />
    </Layout.Header>
  );
}
