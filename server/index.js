const express = require("express");
const cors = require("cors");
const { mongoDB } = require("./src/database/db");

require("dotenv").config({
  quiet: true,
});

const server = express();

server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(cors());

const PORT = process.env.PORT || 5050; // default port for server is 5050

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  mongoDB();
});
