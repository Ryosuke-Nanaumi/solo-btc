import { createApp } from "./app";

const app = createApp();

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running!");
});
