/* eslint-disable react/no-danger */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { FilledContext } from 'react-helmet-async';

const { CLIENT__APP_CONTAINER, CLIENT__CACHE_CONTAINER } = process.env;

const delimeter = '__RKTA__BODY__';

interface Args {
  apolloCache: NormalizedCacheObject;
  bundlePath: string;
  helmet: FilledContext['helmet'];
}

export const template = ({
  apolloCache,
  bundlePath,
  helmet: { base, bodyAttributes, htmlAttributes, link, meta, noscript, script, style, title },
}: Args): [string, string] => {
  const [head, tail] = renderToStaticMarkup(
    <>
      <html lang="en" {...htmlAttributes.toComponent()}>
        <head>
          {title.toComponent()}
          <script src={bundlePath} async />
          {base.toComponent()}
          {link.toComponent()}
          {meta.toComponent()}
          {script.toComponent()}
          {style.toComponent()}
        </head>
        <body {...bodyAttributes.toString()}>
          <div id={CLIENT__APP_CONTAINER}>{delimeter}</div>
          <script
            id={CLIENT__CACHE_CONTAINER}
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(apolloCache) }}
          />
          {noscript.toString()}
        </body>
      </html>
    </>,
  ).split(delimeter);
  return [`<!DOCTYPE html>${head}`, tail as string];
};
