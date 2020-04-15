import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Provider as UiProvider } from '@rkta/ui';
import { css, Global } from '@emotion/core';

export const App = (): JSX.Element => (
  <>
    <Helmet>
      <title>Hello World</title>
    </Helmet>
    <UiProvider>
      <Global
        styles={({ color, Text }): {} => css`
          body {
            ${Text.body}
            ${Text.sans}
            background-color: ${color.paper};
            margin: 0;
            overscroll-behavior: none;
          }
        `}
      />
      Application
    </UiProvider>
  </>
);
