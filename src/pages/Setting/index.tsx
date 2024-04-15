import { Tabs, TabsProps } from 'antd';
import AccountManage from './AccountManage';
import RoleManage from './RoleManage';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: 'account',
      label: '账户维护',
      children: <AccountManage />,
    },
    {
      key: 'role',
      label: '角色维护',
      children: <RoleManage />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />;
};

export default Setting;
