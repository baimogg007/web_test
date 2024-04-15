import classNames from 'classnames';
import locationServices from '@/shared/services/locationServices';
import type { MenuDataItem } from './type';
import getIconMap from './getIconMap';

type GetSubMenuOrItemParams = {
  item: MenuDataItem;
};

const getSubMenuOrItem = ({ item }: GetSubMenuOrItemParams) => {
  if (item.hideInMenu || !item.name) {
    return null;
  }

  const hasChildren = item.routes && item.routes.length;

  const onClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path?: string,
  ) => {
    e.preventDefault();
    path && locationServices.push(path);
  };

  const titleNode = (
    <span className="menu-title-content">
      {hasChildren ? (
        <span>{item.name}</span>
      ) : (
        <span>
          <a href={item.path ?? ''} onClick={(e) => onClick(e, item.path)}>
            {item.name}
          </a>
        </span>
      )}
    </span>
  );

  if (hasChildren && item.routes) {
    return {
      key: item.path,
      icon: getIconMap(item.iconPrefix),
      className: classNames({ 'is-link': item.icon }),
      label: titleNode,
      children: getNavMenuItems({ menuData: item.routes }),
    };
  }

  return {
    key: item.path,
    icon: getIconMap(item.iconPrefix),
    className: classNames({ 'is-link': item.icon }),
    label: titleNode,
  };
};

type TetNavMenuItemsParams = {
  menuData: MenuDataItem[];
};

function getNavMenuItems({ menuData }: TetNavMenuItemsParams): MenuDataItem[] {
  if (!menuData) {
    return [];
  }

  const temp = menuData
    .map((item: MenuDataItem) => getSubMenuOrItem({ item }))
    .filter((item) => !!item);

  return temp as MenuDataItem[];
}

export default getNavMenuItems;
