import Router from "@koa/router";
import { getLinksHandler } from "./getLinks/getLinks";
import { postLinkHandler } from "./postLink/postLink";

const usersPath = "/users/:userId";

export const linksRouter = new Router()
  .get(`${usersPath}/links`, getLinksHandler)
  .post(`${usersPath}/links`, postLinkHandler);

/**
 * TODO:
 * - Add Health check endpoint
 * - Add Smoke test endpoint
 */