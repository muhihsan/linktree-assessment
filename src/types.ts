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

export type LinkTypes = "classic-link" | "music-style" | "shows-link";

export interface Link {
  id: string;
  userId: string;
  linkType: LinkTypes;
  name: string;
  link: string;
  createdDate: string;
  updatedDate: string;
}
