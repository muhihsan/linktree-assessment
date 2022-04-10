import createShowLinkEnricher from "./showLinkEnricher";

describe("createMusicLinkEnricher", () => {
  // TODO: Have fake dataSources factory to prevent the usage of any
  const dataSources: any = {};

  const musicLinkEnricher = createShowLinkEnricher(dataSources);

  describe("test", () => {
    describe.each`
      linkType          | expectedResult
      ${"shows-link"}   | ${true}
      ${"random"}       | ${false}
      ${"classic-link"} | ${false}
    `("when linkType is $linkType", ({ linkType, expectedResult }: any) => {
      it("should return $expectedResult", () => {
        const result = musicLinkEnricher.test(linkType);

        expect(result).toEqual(expectedResult);
      });
    });

    describe("enrich", () => {
      it("should return mock data", () => {
        // TODO: Have fake Link factory to prevent the usage of any
        const link: any = {};

        const result = musicLinkEnricher.enrich(link);

        expect(result).toEqual({
          options: [
            {
              status: "open",
              url: "https://songkick.com/1",
              eventDate: new Date("2019-04-01T00:00:00.000Z").toISOString(),
            },
            {
              status: "sold-out",
              url: "https://songkick.com/2",
              eventDate: new Date("2019-04-02T00:00:00.000Z").toISOString(),
            },
            {
              status: "open",
              url: "https://songkick.com/3",
              eventDate: new Date("2019-04-03T00:00:00.000Z").toISOString(),
            },
            {
              status: "coming-soon",
              url: "https://songkick.com/4",
              eventDate: new Date("2019-04-04T00:00:00.000Z").toISOString(),
            },
          ],
        });
      });
    });
  });
});
