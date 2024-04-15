import { Form, Input, Select, Spin } from 'antd';
import type { ModalAction } from '@/shared/components/ButtonModal';
import FormButtonGroup from '@/shared/components/FormButtonGroup';
import { useMount } from 'ahooks';
import { useRequest } from '@/shared/utils/request';
import { listCompany } from '@/api/Gz/Company';
import { listRole } from '@/api/Gz/Role';
import {
  deleteAccount,
  getAccountById,
  insertAccount,
  updatePassword,
} from '@/api/Gz/Account';

interface NewOrEditFormProps {
  modalAction?: ModalAction;
  reloadList: () => void;
  id?: number;
}

const NewOrEditForm: React.FC<NewOrEditFormProps> = ({
  modalAction,
  reloadList,
  id,
}) => {
  const [form] = Form.useForm();

  const isEdit = !!id;

  const { runAsync: getAccountListAPI, data: listCompanyData } =
    useRequest(listCompany);

  const {
    runAsync: _insertAccount,
    data: _data,
    loading: newLoading,
  } = useRequest(insertAccount);

  const { runAsync: _updatePassword, loading: updateLoading } =
    useRequest(updatePassword);

  const { runAsync: _getIdAccount, loading: detailLoading } =
    useRequest(getAccountById);

  const { runAsync: getRoleInfoListAPI, data: roleInfoListResData } =
    useRequest(listRole);

  useMount(() => {
    getAccountListAPI();
    getRoleInfoListAPI();
    if (isEdit) {
      _getIdAccount({ id }).then((val) => {
        const accountIdData = val?.data as Gz.AccountVO;

        form.setFieldsValue({
          username: accountIdData?.username,
          password: '',
          companyId: accountIdData?.companyId,
          roleId: accountIdData?.roleId,
        });
      });
    }
  });

  const onFinish = (values: Gz.AccountParam) => {
    if (isEdit) {
      _updatePassword({ id }, { password: values.password }).then(() => {
        modalAction?.close();
        reloadList?.();
      });
      return;
    }
    // 新增
    _insertAccount(values, { showSuccessTips: true }).then(() => {
      modalAction?.close();
      reloadList();
    });
  };

  return (
    <Spin spinning={!!detailLoading}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input disabled={isEdit} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="companyId"
          label="公司"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Select
            disabled={isEdit}
            placeholder="请选择公司"
            options={listCompanyData?.data?.map((item: Gz.CompanyVO) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Select
            disabled={isEdit}
            placeholder="请选择角色"
            options={roleInfoListResData?.data?.map((item: Gz.RoleVO) => {
              return {
                value: item.id,
                label: item.name,
              };
            })}
          />
        </Form.Item>

        <FormButtonGroup
          loading={!!(newLoading || updateLoading)}
          showDeleteButton={isEdit}
          deleteButtonProps={{
            requestAPI: deleteAccount,
            requestParams: { id },
            requestSuccess: () => {
              reloadList();
              modalAction?.close();
            },
          }}
          onCancel={() => modalAction?.close()}
          deleteText="删除该账户"
        />
      </Form>
    </Spin>
  );
};

export default NewOrEditForm;
