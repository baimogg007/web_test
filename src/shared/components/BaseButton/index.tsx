import React from 'react';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import classNames from 'classnames';
import './index.less';

export interface BaseButtonProps extends ButtonProps {}

const BaseButton: React.FC<BaseButtonProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <Button
      className={classNames('base-button', className)}
      type="primary"
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
