import { Context, Middleware } from "koa";
import { OrderByDirections, State } from "../../../types";
import validateRequest from "./getLinksValidator";

export const getLinksHandler: Middleware = async (ctx: Context) => {
  const {
    dataSources: { dbClient },
  } = <State>ctx.state;

  const { userId } = ctx.params;
  const { orderBy = "desc" } = ctx.query;

  const validationResult = validateRequest(orderBy as OrderByDirections);
  if (validationResult.error) {
    ctx.throw(400, validationResult.error);
  }

  const links = await dbClient.getLinks(userId, orderBy as OrderByDirections);

  ctx.body = links;
};
