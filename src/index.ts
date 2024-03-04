import { Elysia } from "elysia";
import config from './config';

const app = new Elysia()

app.get("/", () => "Hello Elysia").listen(config.port);

console.log(
  `Bun (🍔) API Starter is running at ${app.server?.hostname}:${app.server?.port}`
);

