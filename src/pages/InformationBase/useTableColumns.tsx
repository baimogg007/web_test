import DeleteModal from '@/shared/components/DeleteModal';
import { Space, Switch } from 'antd';
import NewOrEditModal from './NewOrEditModal';
import BaseButton from '@/shared/components/BaseButton';
import styles from './index.less';
import { deleteMould, updateBorrowState, updateEnabled } from '@/api/Gz/Mould';
import useUserInfo from '@/shared/hooks/useUserInfo';
import { useRequest } from '@/shared/utils/request';

let switchId = -1;
let borrowId = -1;

/// 已借出判断
export const isBorrowed = (val: Gz.MouldVO) => {
  const userinfo = useUserInfo();

  /// 已借出 && 所属公司是自己 && 使用公司是其他
  if (
    val.borrowedState === 1 &&
    val.affiliatedCompany == userinfo.companyName &&
    val.useCompany != userinfo.companyName
  ) {
    return true;
  }
  return false;
};

const useTableProps = (
  reloadList: () => void,
  pageInfo: PaginationType,
  onBorrowStateChange: (id: number) => void,
) => {
  // 修改状态
  const { runAsync: _updateEnabled, loading: updateEnabledLoading } =
    useRequest(updateEnabled);
  // 修改借出状态
  const { runAsync: _updateBorrowState, loading: updateBorrowStateLoading } =
    useRequest(updateBorrowState);

  const onSwitch = (data: Gz.MouldVO) => {
    const nextStatus = data.enabled ? 0 : 1;
    _updateEnabled({ id: data.id, enabled: nextStatus }).then((res) => {
      reloadList();
    });
  };

  const onChangeBorrow = (data: Gz.MouldVO) => {
    const nextStatus = data.borrowedState ? 0 : 1;
    _updateBorrowState({ id: data.id, borrowState: nextStatus }).then((res) => {
      onBorrowStateChange(data.id);
      reloadList();
    });
  };

  const userinfo = useUserInfo();

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render(val: Gz.MouldVO, _: Gz.MouldVO, index: number) {
        return (
          pageInfo.total - (pageInfo.pageNum - 1) * pageInfo.pageSize - index
        );
      },
    },
    {
      title: '模具号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '直径',
      dataIndex: 'diameter',
      key: 'diameter',
    },
    {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
    },
    {
      title: '所属公司',
      dataIndex: 'affiliatedCompany',
      key: 'affiliatedCompany',
    },
    {
      title: '使用公司',
      dataIndex: 'useCompany',
      key: 'useCompany',
    },
    {
      title: '状态',
      render(data: Gz.MouldVO) {
        return (
          <div className={styles.switchRequest}>
            {!isBorrowed(data) ? (
              <Switch
                checked={data.enabled === 1}
                onChange={() => {
                  switchId = data.id;
                  onSwitch(data);
                }}
                loading={switchId == data.id ? updateEnabledLoading : false}
              />
            ) : null}
            <span className={styles.switchRequestText}>
              {isBorrowed(data)
                ? '已借出'
                : data.enabled == 1
                ? '正常'
                : '停用'}
            </span>
          </div>
        );
      },
    },
    {
      title: '借用',
      render(data: Gz.MouldVO) {
        if (isBorrowed(data)) return <div></div>;
        return (
          <BaseButton
            className={data.borrowedState === 0 ? styles.yellowButton : null}
            loading={borrowId == data.id ? updateBorrowStateLoading : false}
            onClick={() => {
              borrowId = data.id;
              onChangeBorrow(data);
            }}
          >
            {userinfo.companyName === data.affiliatedCompany &&
            data.borrowedState === 0
              ? '借出'
              : userinfo.companyName !== data.affiliatedCompany &&
                data.borrowedState === 1
              ? '归还'
              : ''}
          </BaseButton>
        );
      },
    },
    {
      title: '操作',
      render: (data: Gz.MouldVO) => {
        if (isBorrowed(data)) return <div></div>;
        const id = data.id;
        return (
          <Space size={16}>
            <NewOrEditModal id={id} reloadList={reloadList}>
              <span className="operate">修改</span>
            </NewOrEditModal>
            <DeleteModal
              requestAPI={deleteMould}
              requestParams={{ id }}
              requestSuccess={reloadList}
            >
              <span className="operate">删除</span>
            </DeleteModal>
          </Space>
        );
      },
    },
  ];

  return columns;
};

export default useTableProps;
