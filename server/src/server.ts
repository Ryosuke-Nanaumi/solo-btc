import { createApp } from "./app";
import path from "path";
import express from "express";

const app = createApp();

app.use(express.static(path.join(__dirname, "../public")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running!");
});
