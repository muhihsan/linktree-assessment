import { v4 as uuid } from "uuid";
import { Config, Link } from "../types";

export type DataSource = (config: Config) => {
  getLinks: (userId: string) => Array<Link>;
};

export const createDbClient: DataSource = (config) => {
  return {
    getLinks: (userId: string) => {
      // TODO: Get from actual DynamoDB
      return [
        {
          id: uuid(),
          userId,
          name: "testing",
          link: "https://testing.com",
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        } as Link,
      ];
    },
  };
};
