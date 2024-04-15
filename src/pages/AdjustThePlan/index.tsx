import NoDataSource from '@/assets/noDataSource.svg';
import styles from './index.less';
import { DatePicker, Form, Space, Upload, UploadFile, UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import {
  notificationError,
  notificationSuccess,
} from '@/shared/services/notification';
import BaseButton from '@/shared/components/BaseButton';
import FileUploadFormItemNode from './FileUploadFormItemNode';
import { useUpdateEffect } from 'ahooks';
import dayjs from 'dayjs';
import Request from 'umi-request';
import { API_HOST, TOKEN_KEY } from '@/shared/const';
import classNames from 'classnames';
import locationServices from '@/shared/services/locationServices';
import { history } from 'umi';
import ArrowLeft from '@/assets/arrowLeft.svg';
import * as paths from '@/routes/const/paths';

const XLS_TYPE = 'application/vnd.ms-excel';
const XLSX_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const AdjustThePlan = () => {
  const [form] = Form.useForm();
  const [excelData, setExcelData] = useState<any>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const importFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e?.target?.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setExcelData(XLSX.utils.sheet_to_html(worksheet));
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const beforeUpload: Required<UploadProps>['beforeUpload'] = (file) => {
    if (file.type !== XLS_TYPE && file.type !== XLSX_TYPE) {
      notificationError({
        message: '请上传‘.xls’或‘.xlsx’格式的文件',
        duration: 2,
      });
    } else {
      importFile(file);
    }
    return false;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList([info.file]);
  };

  useUpdateEffect(() => {
    form.setFieldsValue({ file: fileList[0] });
  }, [fileList]);

  const props: UploadProps = {
    name: 'file',
    headers: { Authorization: localStorage.getItem(TOKEN_KEY) || '' },
    beforeUpload,
    onChange: handleChange,
    showUploadList: false,
    accept: `xls, xlsx`,
  };

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const onFinish = (values: { date: dayjs.Dayjs; file: any }) => {
    setUploadLoading(true);
    const params = {
      effectiveDate: dayjs(values.date).startOf('day').valueOf(),
      name: values.file.name,
    };

    const formData = new FormData();
    formData.append('file', values.file);
    Request(`${API_HOST}/admin/production/plannings/import`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY) ?? '',
      },
      params,
      body: formData,
    }).then((res) => {
      setUploadLoading(false);

      if (res.code != '00000') {
        notificationError({
          message: res.message,
          duration: 2,
        });
      } else {
        notificationSuccess({
          message: res.message,
          duration: 2,
        });
        history.goBack();
      }
      console.log(res);
    });
  };

  const backPage = () => {
    locationServices.push(paths.productionStatusPath);
  };

  return (
    <div>
      <div className={classNames('page-title', styles.pageTitleWrap)}>
        <div className={styles.backPageIcon} onClick={backPage}>
          <ArrowLeft />
        </div>
        <span>调整生产计划</span>
      </div>
      <div>
        {excelData != '' ? (
          <>
            <Form
              form={form}
              layout="vertical"
              className={classNames('search-form', styles.insertPlan)}
              onFinish={onFinish}
              requiredMark={false}
              initialValues={{ file: fileList[0] }}
            >
              <Space size={20} align="end">
                <Form.Item name="file" label="生产计划">
                  <FileUploadFormItemNode uploadProps={props} />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="生效日期"
                  rules={[{ required: true, message: '不能为空' }]}
                >
                  <DatePicker />
                </Form.Item>
              </Space>

              <div className={styles.fixedButtonBox}>
                <BaseButton loading={uploadLoading} htmlType="submit">
                  确认计划
                </BaseButton>
              </div>
            </Form>
            <div
              className={styles.excel}
              dangerouslySetInnerHTML={{ __html: excelData }}
            ></div>
          </>
        ) : (
          <div className={styles.uploadBox}>
            <NoDataSource />
            <div className={styles.noDataSource}>暂未导入生产计划</div>
            <Upload {...props}>
              <div className="operate">立即导入</div>
            </Upload>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdjustThePlan;
