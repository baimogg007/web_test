import Logo from '@/shared/icons/logo.svg';
import Slogan from '@/assets/slogan.svg';
import People from '@/assets/people.svg';
import LoginForm from './LoginForm';
import styles from './index.less';

const Login = () => {
  return (
    <div className={styles.loginBox}>
      <div className={styles.loginContent}>
        <div className={styles.loginLeft}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.welcome}>欢迎登录</div>
          <LoginForm />
        </div>
        <div className={styles.loginRight}>
          <div className={styles.loginRightContent}>
            <div className={styles.people}>
              <People />
            </div>
            <div className={styles.slogan}>
              <Slogan />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
