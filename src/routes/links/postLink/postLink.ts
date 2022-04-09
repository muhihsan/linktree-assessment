import { Validator } from "jsonschema";
import { Context, Middleware } from "koa";
import { PostLinkRequest, State } from "../../../types";
import validateRequest from "./postLinkValidator";

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
