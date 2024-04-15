import { pathToRegexp } from 'path-to-regexp';
import type { MenuDataItem } from './type';
import { urlToList } from '@/shared/utils';

export const getFlatMenuKeys = (menuData: MenuDataItem[]) => {
  let keys: string[] = [];
  menuData.forEach((item) => {
    item.path && keys.push(item.path);
    if (item.routes) {
      keys = keys.concat(getFlatMenuKeys(item.routes));
    }
  });
  return keys;
};

const getMenuMatches = (flatMenuKeys: string[], path: string): string[] =>
  flatMenuKeys.filter((item) => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

export const getSelectedMenuKeys = (
  pathname: string,
  flatMenuKeys: string[],
): string[] => {
  const result = urlToList(pathname).map((itemPath: string) =>
    getMenuMatches(flatMenuKeys, itemPath).pop(),
  );

  return result as string[];
};
