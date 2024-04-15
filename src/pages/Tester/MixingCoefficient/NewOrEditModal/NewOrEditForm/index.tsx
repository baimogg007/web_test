import { Form, Input, Select } from 'antd';
import type { ModalAction } from '@/shared/components/ButtonModal';
import FormButtonGroup from '@/shared/components/FormButtonGroup';
import { useRequest } from '@/shared/utils/request';
import { updateStirringCoefficient } from '@/api/Gz/PileSpecifications';
import { useMount } from 'ahooks';

interface NewOrEditFormProps {
  modalAction?: ModalAction;
  reloadList: () => void;
  data?: Gz.StirringCoefficientVO;
}

const NewOrEditForm: React.FC<NewOrEditFormProps> = ({
  modalAction,
  reloadList,
  data,
}) => {
  const [form] = Form.useForm();

  const isEdit = !!data?.id;

  const { runAsync: _updateStirringCoefficient, loading: updateLoading } =
    useRequest(updateStirringCoefficient);

  const onFinish = (values: Gz.StirringCoefficientVO) => {
    if (isEdit) {
      _updateStirringCoefficient({
        id: data?.id,
        stirringCoefficient: values.stirringCoefficient,
      }).then((res) => {
        reloadList();
        modalAction?.close();
      });
    } else {
      // 新增
    }
  };

  useMount(() => {
    form.setFieldsValue(data);
  });

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      {!isEdit && (
        <Form.Item
          name="size"
          label="规格"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Select placeholder="请选择规格" options={[]} />
        </Form.Item>
      )}
      <Form.Item
        name="stirringCoefficient"
        label="搅拌系数"
        rules={[{ required: true, message: '不能为空' }]}
      >
        <Input type="number" placeholder="请输入搅拌系数" />
      </Form.Item>

      <FormButtonGroup
        loading={!!updateLoading}
        showDeleteButton={false}
        onCancel={() => modalAction?.close()}
      />
    </Form>
  );
};

export default NewOrEditForm;
