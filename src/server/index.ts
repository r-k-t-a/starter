/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('../../aliases')(path.join(__dirname, '..'));
const { koa } = require('./koa');

koa();
