import validateRequest from "./getLinksValidator";

describe("getLinksValidator", () => {
  describe.each`
    orderByDirection | expectedError
    ${null}          | ${"instance is not of a type(s) string, instance is not one of enum values: asc,desc"}
    ${"random"}      | ${"instance is not one of enum values: asc,desc"}
  `(
    "when orderByDirection is invalid: $orderByDirection",
    ({ orderByDirection, expectedError }: any) => {
      it("should return error", () => {
        const result = validateRequest(orderByDirection);

        expect(result.error).toEqual(expectedError);
      });
    }
  );

  describe.each([undefined, "asc", "desc"])(
    "when orderByDirection is valid: $orderByDirection",
    (orderByDirection: any) => {
      it("should return error", () => {
        const result = validateRequest(orderByDirection);

        expect(result.error).toBeNull();
      });
    }
  );
});
