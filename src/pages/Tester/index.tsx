import { Tabs, TabsProps } from 'antd';
import PileSpecifications from './PileSpecifications';
import MixingCoefficient from './MixingCoefficient';

const Tester = () => {
  const items: TabsProps['items'] = [
    {
      key: 'account',
      label: '桩规格维护',
      children: <PileSpecifications />,
    },
    {
      key: 'role',
      label: '搅拌系数维护',
      children: <MixingCoefficient />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Tester;
