import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification';
import Success from './success.svg';
import Error from './error.svg';

export const notificationSuccess = ({ message, ...params }: ArgsProps) =>
  notification.success({
    icon: <Success />,
    message: (
      <div>
        <span>{message}</span>
      </div>
    ),
    duration: 1.5,
    className: 'a-notification a-notification-success',
    closeIcon: <div>icon</div>,
    ...params,
  });

export const notificationError = ({ message, ...params }: ArgsProps) =>
  notification.error({
    icon: <Error />,
    message: '提示',
    description: (
      <div>
        <span>{message}</span>
      </div>
    ),
    duration: 1.5,
    className: 'a-notification a-notification-error',
    closeIcon: <div>icon</div>,
    ...params,
  });
