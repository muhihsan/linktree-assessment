import Koa, { Context, Next } from "koa";
import bodyParser from "koa-bodyparser";
import compose from "koa-compose";
import config from "../config";
import createDataSources from "../dataSources";

const dataSourcesMiddleware = (ctx: Context, next: Next) => {
  ctx.state.dataSources = createDataSources(config);
  return next();
};

export const createApp = <State, Context>(
  ...middleware: Koa.Middleware<State, Context>[]
) =>
  new Koa()
    .use(bodyParser())
    .use(dataSourcesMiddleware)
    .use(compose(middleware));
