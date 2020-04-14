/* eslint-disable react/no-danger */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FilledContext } from 'react-helmet-async';

const { CLIENT__APP_CONTAINER, CLIENT__CACHE_CONTAINER } = process.env;

const delimeter = '__RKTA__BODY__';

interface Args {
  bundlePath: string;
  helmet: FilledContext['helmet'];
  reduxStore: {};
}

export const template = ({ bundlePath, helmet, reduxStore }: Args): [string, string] => {
  const [head, tail] = renderToStaticMarkup(
    <>
      <html lang="en">
        <head>
          <script src={bundlePath} async />
        </head>
        <body>
          <div id={CLIENT__APP_CONTAINER}>{delimeter}</div>
          <script
            id={CLIENT__CACHE_CONTAINER}
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(reduxStore) }}
          />
        </body>
      </html>
    </>,
  ).split(delimeter);
  return [`<!DOCTYPE html>${head}`, tail as string];
};
