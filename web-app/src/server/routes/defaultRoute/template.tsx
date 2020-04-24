/* eslint-disable react/no-danger */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FilledContext } from 'react-helmet-async';

const { CLIENT__APP_CONTAINER, CLIENT__CACHE_CONTAINER } = process.env;

interface Args {
  bundlePath: string;
  css: string;
  html: string;
  helmet: FilledContext['helmet'];
  ids: string[];
  reduxState: {};
}

export const template = ({
  bundlePath,
  css,
  helmet: { base, bodyAttributes, htmlAttributes, link, meta, noscript, script, style, title },
  html,
  ids,
  reduxState,
}: Args): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <html lang="en" {...(htmlAttributes.toComponent() as any)}>
    <head>
      {title.toComponent()}
      <script src={bundlePath} async />
      {base.toComponent()}
      {link.toComponent()}
      {meta.toComponent()}
      {script.toComponent()}
      {style.toComponent()}
      <style
        dangerouslySetInnerHTML={{ __html: css }}
        data-emotion-css={ids.join(' ')}
        type="text/css"
      />
    </head>
    <body {...bodyAttributes.toString()}>
      <div id={CLIENT__APP_CONTAINER} dangerouslySetInnerHTML={{ __html: html }} />
      <script
        id={CLIENT__CACHE_CONTAINER}
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reduxState) }}
      />
      {noscript.toString()}
    </body>
  </html>
);
