import { DataSources, Link, LinkTypes, MusicLink, ShowLink } from "../types";

const createShowLinkEnricher = (dataSources: DataSources) => {
  return {
    test: (linkType: LinkTypes) => linkType === "shows-link",
    enrich: (link: Link): ShowLink => {
      /**
       * TOOD: Call other shows provider's API to check all upcoming events
       */

      /**
       * Temporarily return mock data
       */
      return {
        ...link,
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
      };
    },
  };
};

export default createShowLinkEnricher;
