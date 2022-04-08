import Koa from "koa";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());

app.listen(8000, () => {
  console.log("Listening to port 8000");
});
