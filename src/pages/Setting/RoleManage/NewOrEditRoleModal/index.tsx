import React from 'react';
import NewOrEditForm from './NewOrEditForm';
import ButtonModal from '@/shared/components/ButtonModal';

interface NewOrEditRoleModalProps {
  children: React.ReactElement;
  reloadList: () => void;
  id?: number;
}

const NewOrEditRoleModal: React.FC<NewOrEditRoleModalProps> = ({
  children,
  reloadList,
  id,
}) => {
  return (
    <ButtonModal
      title={id ? '编辑角色' : '添加角色'}
      footer={null}
      destroyOnClose
      trigger={children}
    >
      <NewOrEditForm id={id} reloadList={reloadList} />
    </ButtonModal>
  );
};

export default NewOrEditRoleModal;
