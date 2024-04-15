import type { ArgsProps } from 'antd/es/notification/index';
import { notificationError } from '@/shared/services/notification';

let isOpened = false;

const instanceNotification = (options: ArgsProps) => {
  if (!isOpened) {
    isOpened = true;
    notificationError({
      ...options,
      onClose() {
        isOpened = false;
      },
    });
  }
};

export default instanceNotification;
