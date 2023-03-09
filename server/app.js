const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require('path');
const userRouter= require("./routes/user-routes");
require("dotenv").config();
require("./config/database").connect();

const app = express();
app.use(express.json({ limit: "50mb" }));
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST","PATCH"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
app.use(express.static('public'));

app.use("/user", userRouter) 


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  // ...
  // Right before your app.listen(), add this:
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "public", "build", "index.html"));
  // });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}
const server = http.createServer(app);
const { API_PORT } = process.env;
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
