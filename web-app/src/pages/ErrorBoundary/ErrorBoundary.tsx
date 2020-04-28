import { jsx } from '@emotion/core';
import { Component, ReactNode, Fragment } from 'react';

import { Connection } from './Connection';
import { ErrorPage } from './ErrorPage';
import { Toast } from './Toast';

interface Props {
  children: ReactNode;
}

interface State {
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {
    message: undefined,
  };

  // TODO: log error and errorInfo
  componentDidCatch(error: Error): void {
    const message = error.message || error.toString();
    this.setState({ message });
  }

  render(): JSX.Element {
    const { message } = this.state;
    if (message) return <ErrorPage message={message} />;
    return (
      <Fragment>
        {this.props.children}
        <Connection />
        <Toast />
      </Fragment>
    );
  }
}
