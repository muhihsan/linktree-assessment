import { Context, Middleware } from "koa";
import { v4 as uuid } from "uuid";
import { Link } from "../../types";

export const getLinksHandler: Middleware = (ctx: Context) => {
  const { userId } = ctx.params;

  const link = [
    {
      id: uuid(),
      userId,
      name: "testing",
      link: "https://testing.com",
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    } as Link,
  ];

  ctx.body = link;
};
