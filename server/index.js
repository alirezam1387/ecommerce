const express = require("express");
const cors = require("cors");
const userRouter = require("./src/router/user.routes");
const MongoDBConnect = require("./src/database/MongoDB");
const ErrorMidlleWere = require("./src/utils/error");
const cookieParser = require("cookie-parser");

require("dotenv").config({
  quiet: true,
});

const server = express();

// cookies
server.use(cookieParser())


server.use(express.json());
server.use(cors());

// server router setup
server.use("/api/user", userRouter);



server.use(ErrorMidlleWere);

const PORT = process.env.PORT || 5050; // default port for server is 5050

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  MongoDBConnect();
});
