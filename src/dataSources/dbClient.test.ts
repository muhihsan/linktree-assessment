import { v4 as uuid } from "uuid";
import { Link } from "../types";
import { createDbClient, linksDatabase } from "./dbClient";

describe("dbClient", () => {
  // TODO: create default test mock config to avoid usage of any
  const mockConfig = {} as any;
  const dbClient = createDbClient(mockConfig);
  const userId = uuid();

  beforeEach(() => {
    linksDatabase.length = 0;
  });

  describe("getLinks", () => {
    it("should return links for user", async () => {
      const expectedLink: Link = {
        id: uuid(),
        userId,
        title: "first link",
        url: "https://testing.com",
        type: "classic-link",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      linksDatabase.push(expectedLink, {
        id: uuid(),
        userId: uuid(),
        title: "second link",
        url: "https://testing.com",
        type: "classic-link",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      });

      const results = await dbClient.getLinks(userId);

      expect(results).toEqual([expectedLink]);
    });

    describe("when ordering the links", () => {
      linksDatabase.push(
        {
          id: uuid(),
          userId,
          title: "first link",
          url: "https://testing.com",
          type: "classic-link",
          createdDate: new Date("2022-04-10T01:28:01.147Z").toISOString(),
          updatedDate: new Date("2022-04-10T01:28:01.147Z").toISOString(),
        },
        {
          id: uuid(),
          userId,
          title: "second link",
          url: "https://testing.com",
          type: "classic-link",
          createdDate: new Date("2022-04-10T01:29:01.147Z").toISOString(),
          updatedDate: new Date("2022-04-10T01:29:01.147Z").toISOString(),
        }
      );

      describe("when orderByDirection is not passed", () => {
        it("should default to desc (latest created date first)", async () => {
          const results = await dbClient.getLinks(userId);

          expect(results[0]).toEqual(linksDatabase[1]);
          expect(results[1]).toEqual(linksDatabase[0]);
        });
      });

      describe("when orderByDirection is desc", () => {
        it("should return latest created date first", async () => {
          const results = await dbClient.getLinks(userId);

          expect(results[0]).toEqual(linksDatabase[1]);
          expect(results[1]).toEqual(linksDatabase[0]);
        });
      });

      describe("when orderByDirection is asc", () => {
        it("should return latest created date first", async () => {
          const results = await dbClient.getLinks(userId);

          expect(results[1]).toEqual(linksDatabase[1]);
          expect(results[0]).toEqual(linksDatabase[0]);
        });
      });
    });
  });

  describe("postLink", () => {
    it("should return update link array", async () => {
      const link: Link = {
        userId,
        title: "testing",
        url: "https://testing.com",
      } as Link;

      await dbClient.postLink(link);

      // TODO: Test if createdDate, updatedDate and id is created
      expect(linksDatabase[0]).toEqual(expect.objectContaining(link));
    });
  });
});
