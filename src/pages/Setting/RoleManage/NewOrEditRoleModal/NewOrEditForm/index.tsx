import { Checkbox, Form, Input, Spin } from 'antd';
import type { ModalAction } from '@/shared/components/ButtonModal';
import FormButtonGroup from '@/shared/components/FormButtonGroup';
import { authorityList } from '../../const/authority';
import { useRequest } from '@/shared/utils/request';
import {
  deleteRole,
  getRolePermissionById,
  insertRole,
  updateRole,
} from '@/api/Gz/Role';
import { useMount } from 'ahooks';

interface NewOrEditFormProps {
  modalAction?: ModalAction;
  reloadList?: () => void;
  id?: number;
}

const NewOrEditForm: React.FC<NewOrEditFormProps> = ({
  modalAction,
  reloadList,
  id,
}) => {
  const [form] = Form.useForm();

  const isEdit = !!id;

  const { runAsync: _insertRole, loading: insertLoading } =
    useRequest(insertRole);
  const { runAsync: _updateRole, loading: uploadLoading } =
    useRequest(updateRole);
  const { runAsync: _getIdRole, loading: detailLoading } = useRequest(
    getRolePermissionById,
  );

  const onFinish = (values: Gz.RoleParam) => {
    if (isEdit) {
      _updateRole({ id }, values).then(() => {
        modalAction?.close();
        reloadList?.();
      });
      return;
    }
    _insertRole(values).then(() => {
      modalAction?.close();
      reloadList?.();
    });
  };

  useMount(() => {
    if (isEdit) {
      _getIdRole({ id }).then((val) => {
        const _roleIdData = val?.data as Gz.RolePermissionVO;

        form.setFieldsValue({
          name: _roleIdData?.name,
          permissionIds: _roleIdData?.permissions?.map((item) => item.id),
        });
      });
    }
  });

  return (
    <Spin spinning={!!detailLoading}>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ permissionIds: [] }}
      >
        <Form.Item
          name="name"
          label="角色名称"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="permissionIds">
          <Checkbox.Group
            options={authorityList.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </Form.Item>

        <FormButtonGroup
          loading={!!(insertLoading || uploadLoading)}
          showDeleteButton={isEdit}
          deleteText="删除该角色"
          deleteButtonProps={{
            requestAPI: deleteRole,
            requestParams: { id },
            requestSuccess: () => {
              reloadList?.();
              modalAction?.close();
            },
          }}
          onCancel={() => modalAction?.close()}
        />
      </Form>
    </Spin>
  );
};

export default NewOrEditForm;
