import { createApp } from "./framework/server";
import { router } from "./routes";

const app = createApp(router.allowedMethods(), router.routes());

app.listen(8000, () => {
  console.log("Listening to port 8000");
});

export default app;
