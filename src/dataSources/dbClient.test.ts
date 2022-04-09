import { v4 as uuid } from "uuid";
import { createDbClient } from "./dbClient";

describe("dynamnoDbClient", () => {
  // TODO: create default test mock config to avoid usage of any
  const mockConfig = {} as any;
  const dbClient = createDbClient(mockConfig);

  describe("getLinks", () => {
    it("should return links for user", async () => {
      const userId = uuid();

      const results = await dbClient.getLinks(userId);

      expect(results[0].userId).toEqual(userId);
    });
  });
});
