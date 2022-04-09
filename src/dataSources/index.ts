import { Config } from "../types";
import { createDbClient } from "./dbClient";

export default (config: Config) => ({
  dbClient: createDbClient(config),
});
