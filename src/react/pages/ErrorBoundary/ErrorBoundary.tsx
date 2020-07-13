import { jsx } from '@emotion/core';
import { Component, ReactNode, Fragment } from 'react';
import get from 'lodash/fp/get';
import toString from 'lodash/fp/toString';

import { Connection } from './Connection';
import { ErrorPage } from './ErrorPage';
import { Toast } from './Toast';

interface Props {
  children: ReactNode;
}

interface State {
  code?: number;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {
    code: undefined,
    message: undefined,
  };

  // TODO: log error and errorInfo
  componentDidCatch(error: Error): void {
    const message = error.message || toString(error);
    const code: number = (get(error, 'code') as number) || 500;
    this.setState({ code, message });
  }

  render(): JSX.Element {
    const { code, message } = this.state;
    if (typeof code === 'number' && typeof message === 'string')
      return (
        <ErrorPage code={(code as unknown) as number} message={(message as unknown) as string} />
      );
    return (
      <Fragment>
        {this.props.children}
        <Connection />
        <Toast />
      </Fragment>
    );
  }
}
