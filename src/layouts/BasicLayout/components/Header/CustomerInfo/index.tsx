import { Dropdown } from 'antd';
import PeopleCircleOutlined from '@/assets/peopleCircleOutlined.svg';
import locationServices from '@/shared/services/locationServices';
import { loginPath } from '@/routes/const/paths';

import styles from './index.less';
import { TOKEN_KEY } from '@/shared/const';
import { logout } from '@/api/Gz/Account';

export default function CustomerInfo() {
  const onLogout = () => {
    logout();
    localStorage.setItem(TOKEN_KEY, '');
    localStorage.setItem('authority', '');
    locationServices.replace(loginPath);
  };

  const menuItem = [
    {
      disabled: false,
      key: 'logout',
      label: <div onClick={onLogout}>退出登录</div>,
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItem }}
      trigger={['click']}
      overlayClassName={styles.customerWrapper}
      getPopupContainer={(triggerNode) => triggerNode}
    >
      <div className={styles.dropdownWrap}>
        <PeopleCircleOutlined />
      </div>
    </Dropdown>
  );
}
