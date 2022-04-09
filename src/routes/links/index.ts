import Router from "@koa/router";
import { getLinksHandler } from "./getLinks";

export const linksRouter = new Router().get("/users/:userId/links", getLinksHandler);
