import React from 'react';
import NewOrEditForm from './NewOrEditForm';
import ButtonModal from '@/shared/components/ButtonModal';

interface NewOrEditRoleModalProps {
  children: React.ReactElement;
  reloadList: () => void;
  id?: number;
}

const NewOrEditModal: React.FC<NewOrEditRoleModalProps> = ({
  children,
  reloadList,
  id,
}) => {
  return (
    <ButtonModal
      title={id ? '编辑账户' : '添加账户'}
      closable={false}
      footer={null}
      destroyOnClose
      trigger={children}
    >
      <NewOrEditForm id={id} reloadList={reloadList} />
    </ButtonModal>
  );
};

export default NewOrEditModal;