"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const renderrer_1 = require("./renderrer");
// todo: https://github.com/dougmoscrop/serverless-http
dotenv_1.default.config();
const { PORT } = process.env;
const app = new koa_1.default();
const router = new koa_router_1.default();
app
    .use(koa_logger_1.default())
    .use(koa_bodyparser_1.default())
    .use(renderrer_1.renderrer)
    .use(router.routes())
    .use(router.allowedMethods());
router.get('*', renderrer_1.renderrer);
app.listen(PORT, () => console.log(`Koa is at http://localhost:${PORT}`));
//# sourceMappingURL=server.js.map