# linktree-assessment
## Development

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
# Start a local HTTP server
npm run start
```

## Code Walkthrough

Here is a quick rundown of what's in the `/src` directory

**`app.ts`** is the starting point of the application

**`config.ts`** is where all config will be stored, eg: environment, database name, etc

**`types.ts`** defines all types and interfaces used in the app

**`dataSources`** all calls to external dependencies will be placed here

**`framework`** is where things like `logging`, `metrics`, etc can be placed later

**`linkEnrichers`** is the logic to enrich links object according to the its `type`. This function is called when `getLinks` route is called. It will call other APIs to get extra info that is unique for certain type of link. For example, shows link will get all upcoming shows. Music link will get all other streaming services that has the same song.

**`routes`** defines all endpoints available to be called

## TODO or Potential Improvements
Most of potential improvements are added into the code files. Some others which can possibly be added as well
- Add lint
- Add integration tests