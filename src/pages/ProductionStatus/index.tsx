import ProductionHeader from './components/ProductionHeader';
import OperateButtonGroup from './components/OperateButtonGroup';
import ProductionTable from './components/ProductionTable';
import useWebSocketApi, { WsType } from '@/shared/hooks/useWebSocketApi';
import { useUnmount } from 'ahooks';
import { useRef, useEffect } from 'react';
import useUserInfo from '@/shared/hooks/useUserInfo';

export default function IndexPage() {
  const intervalRef = useRef<NodeJS.Timer>();
  const { authority } = useUserInfo();

  const {
    api: { sendMessage },
    data: { wsLatestMessage, isConnect, getIsConnect },
  } = useWebSocketApi();

  const wsData: WsType = JSON.parse(wsLatestMessage);
  const { realTimeYieldStatistic, list } = wsData;

  useEffect(() => {
    if (getIsConnect()) {
      intervalRef.current = setInterval(() => {
        sendMessage?.('ping');
      }, 5 * 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isConnect]);

  useUnmount(() => {
    clearInterval(intervalRef.current);
  });

  if (!authority['admin.production']) {
    return <div>欢迎访问管桩生产智慧系统</div>;
  }
  return (
    <div>
      <ProductionHeader dataSource={realTimeYieldStatistic} />
      <OperateButtonGroup />
      <ProductionTable dataSource={list} />
    </div>
  );
}
