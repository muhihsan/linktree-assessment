import { v4 as uuid } from "uuid";
import { Config, PostLinkRequest, Link, OrderByDirections } from "../types";

export type DataSource = (config: Config) => {
  getLinks: (
    userId: string,
    orderByDirection?: OrderByDirections
  ) => Promise<Link[]>;
  postLink: (link: PostLinkRequest & { userId: string }) => Promise<void>;
};

/**
 * TODO: Store to actual Database
 * For example: DynamoDB, etc
 */
export const linksDatabase: Link[] = [];

export const createDbClient: DataSource = (config) => {
  return {
    /**
     * TODO: Pagination
     */
    getLinks: (
      userId: string,
      orderByDirection: OrderByDirections = "desc"
    ) => {
      /**
       * If DynamoDB is used here
       * "createdDate" can be set as sortKey to do the sorting
       * "userId" can be set as partitionKey to get all links for a user
       */
      return Promise.resolve(
        [...linksDatabase]
          .sort((a, b) =>
            orderByDirection === "desc"
              ? -a.createdDate.localeCompare(b.createdDate)
              : a.createdDate.localeCompare(b.createdDate)
          )
          .filter((link) => link.userId === userId)
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
