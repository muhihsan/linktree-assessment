import { Context, Middleware } from "koa";
import { State } from "../../types";

export const postLinkHandler: Middleware = async (ctx: Context) => {
  const {
    dataSources: { dbClient },
  } = <State>ctx.state;

  const { userId } = ctx.params;

  const body = ctx.request.body;

  await dbClient.postLink({ ...body, userId });
};
