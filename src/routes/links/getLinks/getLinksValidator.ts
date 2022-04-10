import { Validator } from "jsonschema";
import { AcceptedOrderByDirections, OrderByDirections } from "../../../types";

const validateRequest = (orderByDirection: OrderByDirections) => {
  var validator = new Validator();
  const validatorResult = validator.validate(orderByDirection, {
    type: "string",
    enum: AcceptedOrderByDirections.map((orderByDirection) => orderByDirection),
  });

  if (!validatorResult.valid) {
    return { error: validatorResult.errors.join(", ") };
  }

  return { error: null };
};

export default validateRequest;
