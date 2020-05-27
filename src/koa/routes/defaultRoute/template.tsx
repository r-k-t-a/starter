/* eslint-disable react/no-danger */
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
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
