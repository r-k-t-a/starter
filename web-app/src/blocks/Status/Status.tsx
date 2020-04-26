import { jsx } from '@emotion/core';
import { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';

interface Props {
  children: ReactNode;
  code: number;
}

export const Status: FC<Props> = ({ children, code }): JSX.Element => (
  <Route
    render={({ staticContext }): ReactNode => {
      if (staticContext) staticContext.statusCode = code;
      return children;
    }}
  />
);
