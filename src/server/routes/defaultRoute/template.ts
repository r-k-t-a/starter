import { NormalizedCacheObject } from 'apollo-cache-inmemory';

const { CLIENT__APP_CONTAINER, CLIENT__CACHE_CONTAINER } = process.env;

interface HelmetItem {
  toString(): string;
}

export interface HelmetData {
  base: HelmetItem;
  bodyAttributes: HelmetItem;
  htmlAttributes: HelmetItem;
  link: HelmetItem;
  meta: HelmetItem;
  noscript: HelmetItem;
  script: HelmetItem;
  style: HelmetItem;
  title: HelmetItem;
}

interface Args {
  apolloCache: NormalizedCacheObject;
  bundlePath: string;
  helmet: HelmetData;
}

export const template = ({
  apolloCache,
  bundlePath,
  helmet: { base, bodyAttributes, htmlAttributes, link, meta, noscript, script, style, title },
}: Args): [string, string] => [
  `<!DOCTYPE html>
<html ${htmlAttributes.toString()}>
  <head>
    ${title.toString()}
    <script src="/${bundlePath}" async></script>
    ${base.toString()}
    ${link.toString()}
    ${meta.toString()}
    ${script.toString()}
    ${style.toString()}
    </head>
    <body ${bodyAttributes.toString()}>
    <div id="${CLIENT__APP_CONTAINER}">`,
  `</div>
    <script id="${CLIENT__CACHE_CONTAINER}" type="application/json">
    ${JSON.stringify(apolloCache)}
    </script>
    ${noscript.toString()}
  </body>
</html>
  `,
];
