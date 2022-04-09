import Router from "@koa/router";
import { linksRouter } from "./links";

export const router = new Router().use(linksRouter.routes());
