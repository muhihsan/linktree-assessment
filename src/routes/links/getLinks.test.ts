import { v4 as uuid } from "uuid";
import { linksRouter } from ".";
import createDataSources from "../../dataSources";
import { agentFromRouter } from "../../../testing/server";
import { Response } from "supertest";

jest.mock("../../dataSources");

describe("getLinksHandler", () => {
  const agent = agentFromRouter(linksRouter);
  const mockGetLinks = jest.fn();

  beforeAll(() => {
    (createDataSources as jest.Mock).mockReturnValue({
      dbClient: { getLinks: mockGetLinks },
    });
    mockGetLinks.mockResolvedValue({ link: "Awesome" });
  });

  describe("when request is valid", () => {
    const userId = uuid();

    let result: Response;

    beforeAll(async () => {
      result = await agent.get(`/users/${userId}/links`).send();
    });

    it("should return 200", () => {
      expect(result.status).toEqual(200);
    });

    it("should return links on body", async () => {
      expect(result.body).toEqual({ link: "Awesome" });
    });
  });
});
