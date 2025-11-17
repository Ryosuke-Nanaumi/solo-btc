import express from"express"

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("fooが呼び出されました。");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running!");
});
