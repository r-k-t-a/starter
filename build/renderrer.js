"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderrer = async (ctx, next) => {
    ctx.body = `<!DOCTYPE html>

  <html lang="en">
    <html>
      <head>
        <title>koa ejs</title>
      </head>
      <body>
        <div id="app">App</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  </html>`;
    await next();
};
//# sourceMappingURL=renderrer.js.map