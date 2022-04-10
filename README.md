# linktree-assessment
## Development

### Requirement
```shell
node
typescript
```

### Install

```shell
npm install
```

### Test

```shell
npm run test
```

### Start

```shell
# Start a local HTTP server at port 8000
npm run start
```

## Code Walkthrough

Here is a quick rundown of what's in the [`/src`](./src/) directory

**`app.ts`** is the starting point of the application

**`config.ts`** is where all config will be stored, eg: environment, database name, etc

**`types.ts`** defines all types and interfaces used in the app

**`dataSources`** all calls to external dependencies will be placed here

**`framework`** is where things like `logging`, `metrics`, different types of `middlewares`, etc can be placed

**`linkEnrichers`** is the logic to enrich links object according to the its `type`. This function is called when `getLinks` route is called. It will call other APIs to get extra info that is unique for certain type of link. For example, shows link will get all upcoming shows. Music link will get all other streaming services that has the same song.

**`routes`** defines all endpoints available to be called

## Adding new link enrichment
- Add a new folder with prefix `Enricher` inside [`linkEnrichers`](./src//linkEnrichers/) folder
- Add a new function that will return [`LinkEnricher`](./src/types.ts#L61) interface
```
export interface LinkEnricher<L extends Link> {
  test: (linkType: LinkTypes) => boolean;
  enrich: (link: Link) => L;
}
```
- Add logic on `test` function to define which link should be enrich from this new enricher
- Add enricher logic to `enrich` function
- Add the new enricher to [`index`](./src/linkEnrichers/index.ts) file
- With the current implementation, only the first enricher that returns `true` from its `test` function, will be used to enrich a link

## TODO or Potential Improvements
Almost all of potential improvements are added into the code files. Some others which can possibly be added as well
- Add lint
- Add integration tests