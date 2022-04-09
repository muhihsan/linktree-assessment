import Router from "@koa/router";
import { getLinksHandler } from "./getLinks";
import { postLinkHandler } from "./postLink";

export const linksRouter = new Router()
  .get("/users/:userId/links", getLinksHandler)
  .post("/users/:userId/links", postLinkHandler);
