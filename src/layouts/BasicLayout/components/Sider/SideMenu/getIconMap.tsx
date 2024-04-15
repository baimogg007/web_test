import * as React from 'react';
import Money from '@/assets/money.svg';
import Clipboard from '@/assets/clipboard.svg';
import Setting from '@/assets/setting.svg';
import Users from '@/assets/users.svg';
import Clock from '@/assets/clock.svg';

const iconMap: Record<string, any> = {
  Money,
  Clipboard,
  Setting,
  Users,
  Clock,
};

const getIconMap = (iconPrefix: string): React.ReactElement | null => {
  const MenuIcon = iconMap[iconPrefix];

  if (MenuIcon) {
    return <MenuIcon />;
  }

  return null;
};

export default getIconMap;
