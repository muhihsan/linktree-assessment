import createMusicLinkEnricher from "./musicLinkEnricher";

describe("createMusicLinkEnricher", () => {
  // TODO: Have fake dataSources factory to prevent the usage of any
  const dataSources: any = {};

  const musicLinkEnricher = createMusicLinkEnricher(dataSources);

  describe("test", () => {
    describe.each`
      linkType          | expectedResult
      ${"music-style"}  | ${true}
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
            { type: "spotify", url: "https://spotify.com" },
            { type: "apple-music", url: "https://apple-music.com" },
            { type: "soundcloud", url: "https://sound-cloud.com" },
            { type: "youtube-music", url: "https://youtube-music.com" },
            { type: "deezer", url: "https://deezer.com" },
            { type: "tidal", url: "https://tidal.com" },
            { type: "bandcamp", url: "https://bandcamp.com" },
          ],
        });
      });
    });
  });
});
