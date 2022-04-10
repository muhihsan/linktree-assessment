import { v4 as uuid } from "uuid";
import { linksRouter } from "..";
import createDataSources from "../../../dataSources";
import { agentFromRouter } from "../../../../testing/server";
import { Response } from "supertest";
import validateRequest from "./getLinksValidator";

jest.mock("../../../dataSources");
jest.mock("./getLinksValidator");

describe("getLinksHandler", () => {
  const agent = agentFromRouter(linksRouter);
  const userId = uuid();

  const mockGetLinks = jest.fn();

  beforeAll(() => {
    (createDataSources as jest.Mock).mockReturnValue({
      dbClient: { getLinks: mockGetLinks },
    });
    mockGetLinks.mockResolvedValue([{ url: "Awesome" }]);
  });

  describe("when request is invalid", () => {
    const body = {};

    let result: Response;

    beforeAll(async () => {
      (validateRequest as jest.Mock).mockReturnValue({
        error: "Something is not right",
      });

      result = await agent.post(`/users/${userId}/links`).send(body);
    });

    it("should return 400", () => {
      expect(result.status).toEqual(400);
    });
  });

  describe("when request is valid", () => {
    let result: Response;

    beforeAll(async () => {
      (validateRequest as jest.Mock).mockReturnValue({
        error: null,
      });

      result = await agent
        .get(`/users/${userId}/links`)
        .query({ orderBy: "asc" })
        .send();
    });

    it("should return 200", () => {
      expect(result.status).toEqual(200);
    });

    it("should pass userId and orderBy to getLinks", () => {
      expect(mockGetLinks).toBeCalledWith(userId, "asc");
    });

    it("should return links on body", async () => {
      expect(result.body).toEqual([{ url: "Awesome" }]);
    });
  });
});
