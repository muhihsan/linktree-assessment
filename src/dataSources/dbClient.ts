import { v4 as uuid } from "uuid";
import { Config, PostLinkRequest, Link } from "../types";

export type DataSource = (config: Config) => {
  getLinks: (userId: string) => Promise<Link[]>;
  postLink: (link: PostLinkRequest & { userId: string }) => Promise<void>;
};

/**
 * TODO: Store to actual Database
 * For example: DynamoDB, etc
 */
export const linksDatabase: Link[] = [];

export const createDbClient: DataSource = (config) => {
  return {
    getLinks: (userId: string) => {
      return Promise.resolve(
        linksDatabase.filter((link) => link.userId === userId)
      );
    },
    postLink: async (link: PostLinkRequest & { userId: string }) => {
      linksDatabase.push({
        ...link,
        id: uuid(),
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      });
    },
  };
};
