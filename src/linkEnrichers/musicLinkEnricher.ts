import { DataSources, Link, LinkTypes, MusicLink } from "../types";

const createMusicLinkEnricher = (dataSources: DataSources) => {
  return {
    test: (linkType: LinkTypes) => linkType === "music-style",
    enrich: (link: Link): MusicLink => {
      /**
       * TOOD: Call other music provider's API to check if the music available on their platform
       */

      /**
       * Temporarily return mock data
       */
      return {
        ...link,
        options: [
          { type: "spotify", url: "https://spotify.com" },
          { type: "apple-music", url: "https://apple-music.com" },
          { type: "soundcloud", url: "https://sound-cloud.com" },
          { type: "youtube-music", url: "https://youtube-music.com" },
          { type: "deezer", url: "https://deezer.com" },
          { type: "tidal", url: "https://tidal.com" },
          { type: "bandcamp", url: "https://bandcamp.com" },
        ],
      };
    },
  };
};

export default createMusicLinkEnricher;
