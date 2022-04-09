import { Context, Middleware } from "koa";
import { State } from "../../../types";

export const getLinksHandler: Middleware = async (ctx: Context) => {
  const {
    dataSources: { dbClient },
  } = <State>ctx.state;

  const { userId } = ctx.params;

  const links = await dbClient.getLinks(userId);

  ctx.body = links;
};
