import { Form, Input, Select, Spin } from 'antd';
import type { ModalAction } from '@/shared/components/ButtonModal';
import FormButtonGroup from '@/shared/components/FormButtonGroup';
import { useMount } from 'ahooks';
import { useRequest } from '@/shared/utils/request';
import { listCompany } from '@/api/Gz/Company';
import { listRole } from '@/api/Gz/Role';
import { getAccountById } from '@/api/Gz/Account';
import {
  deleteMould,
  getMouldById,
  insertMould,
  updateMould,
} from '@/api/Gz/Mould';

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

  const {
    runAsync: _insertMould,
    data: _data,
    loading: newLoading,
  } = useRequest(insertMould);

  const { runAsync: _updateMould, loading: updateLoading } =
    useRequest(updateMould);

  const { runAsync: _getMouldById, loading: detailLoading } =
    useRequest(getMouldById);

  useMount(() => {
    if (isEdit) {
      _getMouldById({ id }).then((val) => {
        const mouldData = val?.data as Gz.MouldVO;

        form.setFieldsValue({
          length: mouldData?.length,
          diameter: mouldData?.diameter,
          code: mouldData?.code,
        });
      });
    }
  });

  const onFinish = (values: Gz.MouldParam) => {
    console.log(values);
    if (isEdit) {
      _updateMould({ id }, values).then(() => {
        modalAction?.close();
        reloadList?.();
      });
      return;
    }
    // 新增
    _insertMould(
      {
        length: Number(values?.length),
        diameter: Number(values?.diameter),
        code: Number(values?.code),
      },
      { showSuccessTips: true },
    ).then(() => {
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
          name="code"
          label="模具号"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input disabled={isEdit} placeholder="请输入模具号" />
        </Form.Item>
        <Form.Item
          name="diameter"
          label="直径"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input type="number" placeholder="请输入直径" />
        </Form.Item>
        <Form.Item
          name="length"
          label="长度"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input type="number" placeholder="请输入长度" />
        </Form.Item>

        <FormButtonGroup
          loading={!!(newLoading || updateLoading)}
          showDeleteButton={isEdit}
          deleteButtonProps={{
            requestAPI: deleteMould,
            requestParams: { id },
            requestSuccess: () => {
              reloadList();
              modalAction?.close();
            },
          }}
          onCancel={() => modalAction?.close()}
          deleteText="删除该模具"
        />
      </Form>
    </Spin>
  );
};

export default NewOrEditForm;
