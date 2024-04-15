import FormButtonGroup from '../FormButtonGroup';
import ButtonModal from '../ButtonModal';
import { useRequest } from '@/shared/utils/request';
import './index.less';

export interface DeleteModalProps {
  children: React.ReactElement;
  requestAPI?: (...args: any) => Promise<any>;
  requestParams?: Record<string, any>;
  requestSuccess?: () => void;
  deleteModalTitle?: string;
  deleteModalText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  children,
  deleteModalTitle = '删除',
  deleteModalText = '是否确认删除？',
  requestAPI = () => Promise.resolve(),
  requestParams,
  requestSuccess,
}) => {
  const { loading: deleteLoading, runAsync } = useRequest(requestAPI);

  return (
    <ButtonModal
      width={353}
      title={deleteModalTitle}
      footer={null}
      destroyOnClose
      trigger={children}
    >
      {(action: any) => (
        <div>
          <div className="delete-modal-content">{deleteModalText}</div>
          <FormButtonGroup
            loading={deleteLoading}
            showDeleteButton={false}
            onConfirm={() => {
              runAsync(requestParams, { showSuccessTips: true }).then(() => {
                action?.close();
                requestSuccess?.();
              });
            }}
            onCancel={() => action?.close()}
          />
        </div>
      )}
    </ButtonModal>
  );
};

export default DeleteModal;
