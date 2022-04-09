import { v4 as uuid } from "uuid";
import { Config, Link } from "../types";

export type DataSource = (config: Config) => {
  getLinks: (userId: string) => Promise<Link[]>;
  postLink: (link: Link) => Promise<void>;
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
    postLink: async (link: Link) => {
      // TODO: store to actual Database
      linksDatabase.push(link);
    },
  };
};
