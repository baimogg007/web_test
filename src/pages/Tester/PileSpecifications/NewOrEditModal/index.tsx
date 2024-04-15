import React from 'react';
import NewOrEditForm from './NewOrEditForm';
import ButtonModal from '@/shared/components/ButtonModal';

interface NewOrEditModalProps {
  children: React.ReactElement;
  reloadList: () => void;
  id?: number;
}

const NewOrEditModal: React.FC<NewOrEditModalProps> = ({
  children,
  reloadList,
  id,
}) => {
  return (
    <ButtonModal
      title={id ? '编辑桩规格' : '添加桩规格'}
      footer={null}
      destroyOnClose
      trigger={children}
    >
      <NewOrEditForm id={id} reloadList={reloadList} />
    </ButtonModal>
  );
};

export default NewOrEditModal;
