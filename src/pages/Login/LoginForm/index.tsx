import { Form, Input } from 'antd';
import { useModel } from 'umi';
import BaseButton from '@/shared/components/BaseButton';
import { useRequest } from '@/shared/utils/request';
import { login } from '@/api/Gz/Account';
import locationServices from '@/shared/services/locationServices';
import styles from './index.less';
import * as paths from '@/routes/const/paths';
import { TOKEN_KEY, USER_INFO } from '@/shared/const';
import { notificationError } from '@/shared/services/notification';

const Login = () => {
  const [form] = Form.useForm();
  const { refresh } = useModel('@@initialState');

  const {
    runAsync: loginAPI,
    data: currentUserAreaData,
    loading: loginLoading,
  } = useRequest(login);

  const onFinish = (values: any) => {
    loginAPI(values, {
      skipToken: true,
    }).then((res) => {
      if (res?.data?.token) {
        localStorage.setItem(TOKEN_KEY, res.data.token);
        localStorage.setItem(USER_INFO, JSON.stringify(res.data));

        refresh();
        locationServices.push(paths.productionStatusPath);
      }
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark={false}
      layout="vertical"
    >
      <Form.Item
        label="账号"
        name="username"
        rules={[{ required: true, message: '账号不能为空' }]}
      >
        <Input maxLength={254} placeholder="账号" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input.Password maxLength={20} type="password" placeholder="请输入" />
      </Form.Item>
      <BaseButton
        htmlType="submit"
        className={styles.loginButton}
        loading={loginLoading}
      >
        登录
      </BaseButton>
    </Form>
  );
};

export default Login;
