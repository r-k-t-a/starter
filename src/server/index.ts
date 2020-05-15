/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('../../module-alias')(path.join(__dirname, '..'));
const { koa } = require('./koa');

koa();
