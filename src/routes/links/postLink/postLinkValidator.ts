import { Validator } from "jsonschema";
import { AcceptedLinkTypes, PostLinkRequest } from "../../../types";

const validateRequest = (request: PostLinkRequest) => {
  var validator = new Validator();
  const validatorResult = validator.validate(request, {
    type: "object",
    properties: {
      title: { type: "string", minLength: 1, maxLength: 144 },
      url: { type: "string", format: "uri" },
      type: {
        type: "string",
        enum: AcceptedLinkTypes.map((linkType) => linkType),
      },
    },
    required: ["title", "url", "type"],
  });

  if (!validatorResult.valid) {
    return { error: validatorResult.errors.join(", ") };
  }

  return { error: null };
};

export default validateRequest;
