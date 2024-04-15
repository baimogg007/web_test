import React from 'react';
import styles from './index.less';

type State = {
  hasError: boolean;
};

type ErrorBoundaryProps = { children: React.ReactNode };

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  // eslint-disable-next-line react/sort-comp
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, errorInfo: object) {
    console.log('error', error);
    console.log('errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorDesc}>抱歉，您访问的页面有误，请联系管理员</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
