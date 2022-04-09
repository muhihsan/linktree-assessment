import { v4 as uuid } from "uuid";
import { linksRouter } from ".";
import createDataSources from "../../dataSources";
import { agentFromRouter } from "../../../testing/server";

jest.mock("../../dataSources");

describe("postLinksHandler", () => {
  const agent = agentFromRouter(linksRouter);
  const mockPostLink = jest.fn();

  beforeAll(() => {
    (createDataSources as jest.Mock).mockReturnValue({
      dbClient: { postLink: mockPostLink },
    });
  });

  describe("when request is valid", () => {
    it("should call postLink", async () => {
      const userId = uuid();
      const body = { name: "testing", link: "https://testing.com" };

      await agent.post(`/users/${userId}/links`).send(body);

      expect(mockPostLink).toBeCalledWith({ ...body, userId });
    });
  });
});
