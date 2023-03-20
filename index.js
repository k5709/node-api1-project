const express = require("express");
const server = require("./api/server");

// const app = express();
const port = 9000;

// START YOUR SERVER HERE
server.listen(port, () => {
  console.log(`n** Server Running on http://localhost:${port} ***\n`);
});
