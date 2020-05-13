# [wip] RKTA Starter

A monorepo boilerplate of: ~~PWA~~, SSR, SPA, Offline, Realtime, CRTDT (LWW), Optimistic UI

## Features

- Preact
- Logux
- React router
- Koa
- Typescript
- Jest
- Eslint
- Prettier
- ~~Code Splitting~~
- Dotenv

## TODO:

- PR for `client.isSubscribing` https://github.com/logux/client/blob/0eb79e7d49597f325afe9bd0a382c33fe40ed148/client/index.js#L108
- PR for `useSubsription` SSR issue https://github.com/logux/redux/blob/60bbc28c286dd069073583be9bfd8fda1984a66b/use-subscription/index.js#L47
- PR to logux server — add `prerender` method
- PR to logux server — add `bridge`

## Setup .env

Copy `.env.sample` to `.env`, mind that all keys prefixed with `CLIENT__` will be available on the client.

## Npm commands

- `npm run dev` — start development server
- `npm run build` — create the production build
- `npm start` — start production server
