import { Form, Input, Spin } from 'antd';
import type { ModalAction } from '@/shared/components/ButtonModal';
import FormButtonGroup from '@/shared/components/FormButtonGroup';
import { useRequest } from '@/shared/utils/request';
import {
  deletePileSpecifications,
  getPileSpecificationsById,
  insertPileSpecifications,
  updatePileSpecifications,
} from '@/api/Gz/PileSpecifications';
import useMount from 'ahooks/lib/useMount';

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

  const formCode = Form.useWatch('code', form);
  const formPrestress = Form.useWatch('prestress', form);
  const formDiameter = Form.useWatch('diameter', form);
  const formWallThickness = Form.useWatch('wallThickness', form);

  const fullName = `${formCode}-${formDiameter ?? ''}(${formPrestress})-${
    formWallThickness ?? ''
  }`;
  const abbreviation = `${formDiameter ?? ''}-${formWallThickness ?? ''}`;

  const { runAsync: _getPileSpecificationsById, loading: detailLoading } =
    useRequest(getPileSpecificationsById);
  const {
    runAsync: _insertPileSpecifications,
    data: _data,
    loading: newLoading,
  } = useRequest(insertPileSpecifications);
  const { runAsync: _updatePileSpecifications, loading: updateLoading } =
    useRequest(updatePileSpecifications);

  const onFinish = (
    values: Omit<Gz.PileSpecificationsParam, 'fullName' | 'abbreviation'>,
  ) => {
    const params = {
      ...values,
      fullName: `${values.code}-${values.diameter}(${values.prestress})-${values.wallThickness}`,
      abbreviation: `${values.diameter}-${values.wallThickness}`,
    };

    if (isEdit) {
      _updatePileSpecifications({ id }, params).then((res) => {
        reloadList();
        modalAction?.close();
      });
      // 编辑
    } else {
      _insertPileSpecifications(params).then((res) => {
        reloadList();
        modalAction?.close();
      });
    }
  };

  useMount(() => {
    if (isEdit) {
      _getPileSpecificationsById({ id }).then((val) => {
        const pileSpecificationsData = val?.data as Gz.PileSpecificationsVO;

        form.setFieldsValue(pileSpecificationsData);
      });
    }
  });

  return (
    <Spin spinning={!!detailLoading}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ code: 'PHC', prestress: 'AB' }}
      >
        <Form.Item
          name="code"
          label="代号"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input placeholder="请输入代号" />
        </Form.Item>
        <Form.Item
          name="prestress"
          label="预应力"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input placeholder="请输入预应力" />
        </Form.Item>
        <Form.Item
          name="diameter"
          label="直径"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input type="number" placeholder="请输入预应力" />
        </Form.Item>
        <Form.Item
          name="wallThickness"
          label="壁厚"
          rules={[{ required: true, message: '不能为空' }]}
        >
          <Input type="number" placeholder="请输入壁厚" />
        </Form.Item>
        <Form.Item label="桩规格">
          <Input disabled value={fullName} />
        </Form.Item>
        <Form.Item label="桩规格简称">
          <Input disabled value={abbreviation} />
        </Form.Item>

        <FormButtonGroup
          loading={!!(newLoading || updateLoading)}
          showDeleteButton={isEdit}
          deleteButtonProps={{
            requestAPI: deletePileSpecifications,
            requestParams: { id },
            requestSuccess: () => {
              reloadList();
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
