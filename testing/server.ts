import Router from '@koa/router';
import Koa from 'koa';
import request from 'supertest';

import { createApp } from '../src/framework/server';

export const agentFromApp = <State, Context>(app: Koa<State, Context>) =>
  request.agent(app.callback());

export const agentFromRouter = (router: Router) => {
  const app = createApp(router.routes(), router.allowedMethods());

  return agentFromApp(app);
};
