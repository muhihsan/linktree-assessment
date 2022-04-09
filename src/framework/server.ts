import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compose from "koa-compose";

export const createApp = <State, Context>(
  ...middleware: Koa.Middleware<State, Context>[]
) => new Koa().use(bodyParser()).use(compose(middleware));
