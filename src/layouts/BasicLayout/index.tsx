import type { IRouteComponentProps } from 'umi';
import { Layout } from 'antd';
import Header from './components/Header';
import useSetPageTitle from '../utils/useSetPageTitle';
import Sider from './components/Sider';
import ErrorBoundary from './components/ErrorBoundary';
import './index.less';
import { useEffect, useState } from 'react';
import { TOKEN_KEY } from '@/shared/const';
import instanceNotification from '@/shared/utils/request/instanceNotification';
import * as paths from '@/routes/const/paths';
import history from '@/shared/services/locationServices';
import { PageLoading } from '@ant-design/pro-layout';

export default function IndexPage(props: IRouteComponentProps) {
  const {
    route: { routes },
  } = props;

  useSetPageTitle(routes);

  const _token: string | null = localStorage.getItem(TOKEN_KEY);
  if (!_token) {
    const isLoginPath = [paths.loginPath, paths.rootPath].includes(
      window.location.pathname,
    );
    if (!isLoginPath) {
      instanceNotification({
        message: '提示',
        description: '登陆失效',
      });
    }
    history.replace(paths.loginPath);
    return <PageLoading />;
  }

  return (
    <Layout style={{ background: 'white' }}>
      <Sider routes={routes} />
      <Layout className="main-layout">
        <Header />
        <Layout className="content-layout">
          <Layout.Content>
            <ErrorBoundary>{props.children}</ErrorBoundary>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
