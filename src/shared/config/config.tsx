import { Button, TablePaginationConfig } from 'antd';

export type PaginationConfigType = (
  total: number,
  onChange: (args: PaginationType) => void,
) => false | TablePaginationConfig;

export const paginationConfig: PaginationConfigType = (
  total: number,
  onChange: (args: PaginationType) => void,
) => ({
  position: ['bottomCenter'],
  showSizeChanger: true,
  total: total,
  showQuickJumper: true,
  nextIcon: <Button type="link">下一页</Button>,
  prevIcon: <Button type="link">上一页</Button>,
  onChange(page: number, pageSize: number) {
    onChange({ pageSize, pageNum: page });
  },
});
