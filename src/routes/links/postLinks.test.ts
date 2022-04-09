import { v4 as uuid } from "uuid";
import { linksRouter } from ".";
import createDataSources from "../../dataSources";
import { agentFromRouter } from "../../../testing/server";
import { Response } from "supertest";

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
    const userId = uuid();
    const body = { name: "testing", link: "https://testing.com" };

    let result: Response;

    beforeAll(async () => {
      result = await agent.post(`/users/${userId}/links`).send(body);
    });

    it("should call postLink", async () => {
      expect(mockPostLink).toBeCalledWith({ ...body, userId });
    });

    it("should return 201", async () => {
      expect(result.status).toEqual(201);
    });
  });
});