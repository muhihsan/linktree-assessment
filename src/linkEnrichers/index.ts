import { DataSources, Link } from "../types";
import createMusicLinkEnricher from "./musicLinkEnricher";
import createShowLinkEnricher from "./showLinkEnricher";

/**
 * TODO: Add test 
 */
const createLinkEnricher = (dataSources: DataSources) => {
  const linkEnrichers = [
    createMusicLinkEnricher(dataSources),
    createShowLinkEnricher(dataSources),
  ];

  return {
    enrich: (link: Link) => {
      const linkEnricher = linkEnrichers.find((linkEnricher) =>
        linkEnricher.test(link.type)
      );

      if (!linkEnricher) {
        return link;
      }

      return linkEnricher.enrich(link);
    },
  };
};

export default createLinkEnricher;
