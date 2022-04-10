import { Context, Middleware } from "koa";
import { PostLinkRequest, State } from "../../../types";
import validateRequest from "./postLinkValidator";

/**
 * TODO: Provide idempotent endpoint
 * To allow retry from the client without creating duplicate links
 * 
 * Example, by storing a unique request id created by the client in DB
 * This allows for validation if record for the same request id has been created previously
 * 
 * If DynamoDB is used as data storage, ConditionExpression can be used to achieve it
 */

export const postLinkHandler: Middleware = async (ctx: Context) => {
  const {
    dataSources: { dbClient },
  } = <State>ctx.state;
  const { userId } = ctx.params;

  const request = ctx.request.body as PostLinkRequest;

  const validationResult = validateRequest(request);
  if (validationResult.error) {
    ctx.throw(400, validationResult.error);
  }

  await dbClient.postLink({ ...request, userId });

  ctx.status = 201;
};
