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
dotenv_1.default.config();
const app = new koa_1.default();
const router = new koa_router_1.default();
const { PORT } = process.env;
app
    .use(koa_logger_1.default())
    .use(koa_bodyparser_1.default())
    .use(router.routes())
    .use(router.allowedMethods());
router.get('/', async (ctx, next) => {
    ctx.body = { message: 'This is your GET route' };
    await next();
});
router.post('/data', async (ctx, next) => {
    ctx.body = {
        message: 'This is your POST route, attached you can find the data you sent',
        body: ctx.request.body,
    };
    await next();
});
app.listen(PORT, () => console.log(`Koa is at ${PORT}`));
//# sourceMappingURL=server.js.map