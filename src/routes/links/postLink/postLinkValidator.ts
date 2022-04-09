import { Validator } from "jsonschema";
import { PostLinkRequest } from "../../../types";

const validateRequest = (request: PostLinkRequest) => {
  var validator = new Validator();
  const validatorResult = validator.validate(request, {
    type: "object",
    properties: {
      title: { type: "string", minLength: 1, maxLength: 144 },
      link: { type: "string", format: "uri" },
      linkType: {
        type: "string",
        enum: ["classic-link", "music-style", "shows-link"],
      },
    },
    required: ["title", "link", "linkType"],
  });

  if (!validatorResult.valid) {
    return { error: validatorResult.errors.join(", ") };
  }

  return { error: null };
};

export default validateRequest;
