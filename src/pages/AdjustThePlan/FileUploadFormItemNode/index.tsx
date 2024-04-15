import Excel from '@/assets/excel.svg';
import styles from './index.less';
import { Upload, UploadFile, UploadProps } from 'antd';
import classNames from 'classnames';

interface Props {
  value?: UploadFile;
  uploadProps: UploadProps;
}

const FileUploadFormItemNode: React.FC<Props> = ({ value, uploadProps }) => {
  return (
    <div className={styles.fileNameAndOperate}>
      <div className={styles.fileNameAndIcon}>
        <Excel />
        <div className={styles.fileName}>{value?.name}</div>
      </div>
      <Upload {...uploadProps}>
        <div className="operate">重新导入</div>
      </Upload>
    </div>
  );
};

export default FileUploadFormItemNode;
