const express = require("express");
const cors = require("cors");
const userRouter = require("./src/router/user.routes");
const MongoDBConnect = require("./src/database/MongoDB");
const ErrorMidlleWere = require("./src/utils/error");

require("dotenv").config({
  quiet: true,
});

const server = express();

server.use(express.json());
server.use(cors());

// errors
server.use(ErrorMidlleWere);

// server router setup
server.use("/api/user", userRouter);

const PORT = process.env.PORT || 5050; // default port for server is 5050

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  MongoDBConnect();
});
