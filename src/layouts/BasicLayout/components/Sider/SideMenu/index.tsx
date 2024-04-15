import React from 'react';
import { Menu } from 'antd';
import { useLocation } from 'react-router';
import getNavMenuItems from './getNavMenuItems';
import type { MenuDataItem } from './type';
import { getFlatMenuKeys, getSelectedMenuKeys } from './menuUtils';

export type MenuProps = {
  menuData?: MenuDataItem[];
  [key: string]: any;
};

const SiderMenu = (props: MenuProps) => {
  const { menuData = [], ...menuProps } = props;

  const { pathname } = useLocation();
  const flatMenuKeys = getFlatMenuKeys(menuData);
  const selectedKeys: string[] = getSelectedMenuKeys(pathname, flatMenuKeys);

  return (
    <Menu
      mode="inline"
      {...menuProps}
      selectedKeys={selectedKeys}
      items={getNavMenuItems({ menuData })}
    />
  );
};

export default React.memo(SiderMenu);
