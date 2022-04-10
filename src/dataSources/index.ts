import { Config, DataSources } from "../types";
import { createDbClient } from "./dbClient";

export default (config: Config): DataSources => ({
  dbClient: createDbClient(config),
  /**
   * Other API clients will be placed here
   * Eg: spotifyApiClient: createSpotifyApiClient(config),
   */
});
