import { PostLinkRequest } from "../../../types";
import validateRequest from "./postLinkValidator";

describe("postLinkValidator", () => {
  describe("when title is empty", () => {
    it("should return error", () => {
      const request: PostLinkRequest = {
        title: "",
        type: "classic-link",
        url: "https://testing.com",
      };

      const result = validateRequest(request);

      expect(result.error).toEqual(
        "instance.title does not meet minimum length of 1"
      );
    });
  });

  describe("when title is longer than 144 characters", () => {
    it("should return error", () => {
      const request: PostLinkRequest = {
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        type: "classic-link",
        url: "https://testing.com",
      };

      const result = validateRequest(request);

      expect(result.error).toEqual(
        "instance.title does not meet maximum length of 144"
      );
    });
  });

  describe("when type is not recognised", () => {
    it("should return error", () => {
      const request: any = {
        title: "Test",
        type: "random",
        url: "https://testing.com",
      };

      const result = validateRequest(request);
    });
  });

  describe("when link doesn't have uri format", () => {
    it("should return error", () => {
      const request: PostLinkRequest = {
        title: "Test",
        type: "classic-link",
        url: "random",
      };

      const result = validateRequest(request);

      expect(result.error).toEqual(
        'instance.url does not conform to the "uri" format'
      );
    });
  });

  describe("when unrecognise property found in the body", () => {
    it("should return error", () => {
      const request: any = {
        title: "Test",
        type: "classic-link",
        url: "https://testing.com",
        random: "test-random",
      };

      const result = validateRequest(request);

      expect(result.error).toEqual(
        'instance is not allowed to have the additional property "random"'
      );
    });
  });

  describe("when all fields valid", () => {
    it("should return error null", () => {
      const request: PostLinkRequest = {
        title: "Test",
        type: "classic-link",
        url: "https://testing.com",
      };

      const result = validateRequest(request);

      expect(result.error).toBeNull();
    });
  });

  describe("when URL contains query string", () => {
    it("should return error null", () => {
      const request: PostLinkRequest = {
        title: "Test",
        type: "classic-link",
        url: "https://testing.com?areyousure=true",
      };

      const result = validateRequest(request);

      expect(result.error).toBeNull();
    });
  });
});
