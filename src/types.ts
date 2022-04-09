import { DataSource as DbClient } from "./dataSources/dbClient";
import dataSources from "./dataSources";

export interface Config {
  environment: string;
  resources: { db: string };
}

export interface DataSources {
  dbClient: ReturnType<DbClient>;
}

export interface State {
  dataSources: DataSources;
}

export const AcceptedLinkTypes = [
  "classic-link",
  "music-style",
  "shows-link",
] as const;
export type LinkTypes = typeof AcceptedLinkTypes[number];

export interface Link {
  id: string;
  userId: string;
  type: LinkTypes;
  title: string;
  url: string;
  createdDate: string;
  updatedDate: string;
}

export type PostLinkRequest = Omit<
  Link,
  "id" | "userId" | "createdDate" | "updatedDate"
>;
