import Koa, { Context, Next } from "koa";
import bodyParser from "koa-bodyparser";
import compose from "koa-compose";
import config from "../config";
import createDataSources from "../dataSources";

const dataSourcesMiddleware = (ctx: Context, next: Next) => {
  ctx.state.dataSources = createDataSources(config);
  return next();
};

const authMiddleware = (ctx: Context, next: Next) => {
  /**
   * TODO: Validate bearer token and user access
   * Check if token is valid
   * Then check if user is still valid (in case if the user has been disabled or else)
   *
   * UserId can be retrieved from here, hence there is no need for it to be passed on the URL
   */

  return next();
};

const requestLoggingMiddleware = (ctx: Context, next: Next) => {
  /**
   * TODO: Add some requests info to the logs
   * Some of example:
   * - X-Request-Id
   * - Method
   * - Route Name
   * - URL
   * - Latency
   */

  return next();
};

export const createApp = <State, Context>(
  ...middleware: Koa.Middleware<State, Context>[]
) =>
  new Koa()
    .use(bodyParser())
    .use(requestLoggingMiddleware)
    .use(dataSourcesMiddleware)
    .use(authMiddleware)
    .use(compose(middleware));
