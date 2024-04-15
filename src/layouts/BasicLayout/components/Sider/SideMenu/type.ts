import type { ItemType } from 'antd/es/menu/hooks/useItems';

export interface MenuDataItem extends Omit<ItemType, 'children'> {
  routes?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: any;
  locale?: string | false;
  name?: string;
  key: string;
  path?: string;
  parentKeys?: string[];
  [key: string]: any;
  children?: ItemType[];
}
