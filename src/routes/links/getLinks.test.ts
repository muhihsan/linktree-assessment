import { v4 as uuid } from "uuid";
import { linksRouter } from ".";
import { agentFromRouter } from "../../../testing/server";

describe("getLinksHandler", () => {
  const agent = agentFromRouter(linksRouter);

  describe("when request is valid", () => {
    it("should return links on body", async () => {
      const userId = uuid();

      await agent.get(`/users/${userId}/links`).expect(200);
    });
  });
});
