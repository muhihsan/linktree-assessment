import { v4 as uuid } from "uuid";
import { linksRouter } from ".";
import createDataSources from "../../dataSources";
import { agentFromRouter } from "../../../testing/server";

jest.mock("../../dataSources");

describe("getLinksHandler", () => {
  const agent = agentFromRouter(linksRouter);
  const mockGetLinks = jest.fn();

  beforeAll(() => {
    (createDataSources as jest.Mock).mockReturnValue({
      dbClient: { getLinks: mockGetLinks },
    });

    mockGetLinks.mockResolvedValue("Awesome");
  });

  describe("when request is valid", () => {
    it("should return links on body", async () => {
      const userId = uuid();

      await agent.get(`/users/${userId}/links`).expect(200, "Awesome");
    });
  });
});
