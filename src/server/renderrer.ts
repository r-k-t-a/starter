import { Context } from 'koa';

export const renderrer = async (ctx: Context) => {
  await ctx.render('template', { content: 'Hello' });
};
