/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { Helmet } from 'react-helmet-async';
import { Provider as UiProvider, Heading } from '@rkta/ui';
import { usePage } from 'hook';

export const App = (): JSX.Element => {
  const [page] = usePage();
  // console.log('page', page);
  return (
    <div>
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
        <Heading level={1}>{page?.h1}</Heading>
      </UiProvider>
    </div>
  );
};
