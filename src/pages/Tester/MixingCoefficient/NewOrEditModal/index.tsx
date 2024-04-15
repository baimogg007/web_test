import React from 'react';
import NewOrEditForm from './NewOrEditForm';
import ButtonModal from '@/shared/components/ButtonModal';

interface NewOrEditModalProps {
  children: React.ReactElement;
  reloadList: () => void;
  data?: Gz.StirringCoefficientVO;
}

const NewOrEditModal: React.FC<NewOrEditModalProps> = ({
  children,
  reloadList,
  data,
}) => {
  return (
    <ButtonModal
      title={data?.id ? '编辑' : '添加'}
      footer={null}
      destroyOnClose
      trigger={children}
    >
      <NewOrEditForm data={data} reloadList={reloadList} />
    </ButtonModal>
  );
};

export default NewOrEditModal;
