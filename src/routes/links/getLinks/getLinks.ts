import { Context, Middleware } from "koa";
import createLinkEnricher from "../../../linkEnrichers";
import { OrderByDirections, State } from "../../../types";
import validateRequest from "./getLinksValidator";

export const getLinksHandler: Middleware = async (ctx: Context) => {
  const { dataSources } = <State>ctx.state;
  const { dbClient } = dataSources;

  const { userId } = ctx.params;
  const { orderBy = "desc" } = ctx.query;

  const validationResult = validateRequest(orderBy as OrderByDirections);
  if (validationResult.error) {
    ctx.throw(400, validationResult.error);
  }

  const links = await dbClient.getLinks(userId, orderBy as OrderByDirections);

  if (!links) {
    ctx.body = [];
    return;
  }

  const linkEnricher = createLinkEnricher(dataSources);
  const enrichedLinks = links.map((link) => linkEnricher.enrich(link));
  
  ctx.body = enrichedLinks;
};
