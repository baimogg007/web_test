import classNames from 'classnames';
import BaseButton from '../BaseButton';
import Delete from '@/assets/delete.svg';
import DeleteModal, { DeleteModalProps } from '../DeleteModal';
import './index.less';

export interface FormButtonGroupProps {
  loading?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  deleteButtonProps?: Omit<DeleteModalProps, 'children'>;
  showCancelButton?: boolean;
  showDeleteButton?: boolean;
  confirmText?: string;
  deleteText?: string;
  disabled?: boolean;
  className?: string;
}

const FormButtonGroup: React.FC<FormButtonGroupProps> = (props) => {
  const {
    loading,
    onCancel,
    onConfirm,
    deleteButtonProps = {},
    showCancelButton = true,
    showDeleteButton = true,
    confirmText = '确认',
    deleteText = '删除',
    disabled,
    className,
  } = props;
  const deleteButton = (
    <DeleteModal {...deleteButtonProps}>
      <div className="form-delete-button">
        <Delete />
        {deleteText}
      </div>
    </DeleteModal>
  );

  return (
    <div
      className={classNames(
        'form-button-group',
        { 'hidden-form-delete-button': !showDeleteButton },
        className,
      )}
    >
      {showDeleteButton && deleteButton}
      <div
        className={classNames(
          'form-base-operate-button-group',
          { 'hidden-form-cancel-button ': !showCancelButton },
          className,
        )}
      >
        {showCancelButton && (
          <BaseButton ghost onClick={onCancel} className="form-cancel-button">
            取消
          </BaseButton>
        )}
        <BaseButton
          loading={loading}
          onClick={onConfirm}
          htmlType="submit"
          className="form-confirm-button"
          disabled={disabled}
        >
          {confirmText}
        </BaseButton>
      </div>
    </div>
  );
};

export default FormButtonGroup;
