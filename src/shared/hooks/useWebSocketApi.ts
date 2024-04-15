import { useMount, useWebSocket } from 'ahooks';
import { useCallback, useRef } from 'react';
import { TOKEN_KEY } from '../const';

export type ListRecordType = {
  pileSpecificationsName: string;
  pileSpecificationsLength: number;
  planQuantity: number;
  planMeters: number;
  actualQuantity: number;
  actualMeters: number;
  completedRate: string;
  remark: string;
};

export type InfoType = {
  planQuantity: number;
  actualQuantity: number;
  quantityCompletedRate: string;
  planMeters: number;
  actualMeters: number;
  metersCompletedRate: string;
};

export type WsType = {
  realTimeYieldStatistic: InfoType;
  list: ListRecordType[];
};

const OPEN = 1;

const initJsonStr = JSON.stringify({
  realTimeYieldStatistic: {
    planQuantity: 0,
    actualQuantity: 0,
    quantityCompletedRate: '0',
    planMeters: 0,
    actualMeters: 0,
    metersCompletedRate: '0',
  },
  list: [],
});

const useWebSocketApi = () => {
  const wsLatestMessageRef = useRef<string>(initJsonStr);
  const isConnectRef = useRef(false);
  const { latestMessage, readyState, connect, sendMessage } = useWebSocket(
    'ws://pipe.peonytao.top:8888/pipe/pile/admin/websocket/yields',
    {
      manual: true,
      protocols: localStorage.getItem(TOKEN_KEY) || '',
      onError(...error) {
        console.log('--error', error);
      },
    },
  );

  const isConnect = readyState === OPEN;
  isConnectRef.current = isConnect;
  const getIsConnect = useCallback(() => isConnectRef.current, []);

  if (latestMessage) {
    console.log('latestMessage', latestMessage);

    try {
      // if (!latestMessage?.data) {
      //   wsLatestMessageRef.current = initJsonStr;
      // }
      if (latestMessage.data !== 'pong') {
        wsLatestMessageRef.current = latestMessage.data;
        localStorage.setItem('wsData', latestMessage.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  useMount(() => {
    if (!isConnect) {
      connect?.();
    }
  });

  return {
    api: { sendMessage },
    data: {
      wsLatestMessage: wsLatestMessageRef.current,
      isConnect,
      getIsConnect,
    },
  };
};

export default useWebSocketApi;
