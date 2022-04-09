import { v4 as uuid } from "uuid";
import { Link } from "../types";
import { createDbClient, linksDatabase } from "./dbClient";

describe("dynamnoDbClient", () => {
  // TODO: create default test mock config to avoid usage of any
  const mockConfig = {} as any;
  const dbClient = createDbClient(mockConfig);

  beforeEach(() => {
    linksDatabase.length = 0;
  });

  describe("getLinks", () => {
    it("should return links for user", async () => {
      const userId = uuid();
      const expectedLink = {
        id: uuid(),
        userId,
        name: "first link",
        link: "https://testing.com",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      linksDatabase.push(expectedLink, {
        id: uuid(),
        userId: uuid(),
        name: "second link",
        link: "https://testing.com",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      });

      const results = await dbClient.getLinks(userId);

      expect(results).toEqual([expectedLink]);
    });
  });

  describe("postLink", () => {
    it("should return update link array", async () => {
      const userId = uuid();

      const link: Link = {
        userId,
        name: "testing",
        link: "https://testing.com",
      } as Link;

      await dbClient.postLink(link);

      // TODO: Test if createdDate, updatedDate and id is created
      expect(linksDatabase[0]).toEqual(expect.objectContaining(link));
    });
  });
});
