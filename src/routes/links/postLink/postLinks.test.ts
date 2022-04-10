import { v4 as uuid } from "uuid";
import { Response } from "supertest";
import { linksRouter } from "..";
import createDataSources from "../../../dataSources";
import { agentFromRouter } from "../../../../testing/server";
import { PostLinkRequest } from "../../../types";
import validateRequest from "./postLinkValidator";

jest.mock("../../../dataSources");
jest.mock("./postLinkValidator");

describe("postLinkHandler", () => {
  const agent = agentFromRouter(linksRouter);
  const userId = uuid();
  
  const mockPostLink = jest.fn();

  beforeAll(() => {
    (createDataSources as jest.Mock).mockReturnValue({
      dbClient: { postLink: mockPostLink },
    });
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
    const body: PostLinkRequest = {
      title: "testing",
      url: "https://testing.com",
      type: "classic-link",
    };

    let result: Response;

    beforeAll(async () => {
      (validateRequest as jest.Mock).mockReturnValue({
        error: null,
      });

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
