import { v4 as uuid } from "uuid";
import { Config, PostLinkRequest, Link } from "../types";

export type DataSource = (config: Config) => {
  getLinks: (userId: string) => Promise<Link[]>;
  postLink: (link: PostLinkRequest & { userId: string }) => Promise<void>;
};

export const linksDatabase: Link[] = [];

export const createDbClient: DataSource = (config) => {
  return {
    getLinks: (userId: string) => {
      // TODO: Get from actual Database
      return Promise.resolve(
        linksDatabase.filter((link) => link.userId === userId)
      );
    },
    postLink: async (link: PostLinkRequest & { userId: string }) => {
      // TODO: store to actual Database
      linksDatabase.push({
        ...link,
        id: uuid(),
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      });
    },
  };
};
