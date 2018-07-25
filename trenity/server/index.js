//CORE Utitlies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const db = require("./db");

//Helper Utilities
const fs = require("fs-extra");
const moment = require("moment");
const util = require("util");
const sleep = require("sleep");
const cors = require("cors");

//Initial Setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const setupSockets = require("./routes/socket")(io);
const { PORT, BUILD_DIRECTORY, DB_URL } = require("./variables");

app.use("/api", require("./routes/api"));

/* === Express Setup === */
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION_ENV");

  app.use(express.static(BUILD_DIRECTORY));
  app.get("*", (req, res) => res.sendFile(`${BUILD_DIRECTORY}/index.html`));
} else {
  app.get("/", (req, res) => res.send("Developing locally. Happy Hacking!"));
}

db.connect(
  DB_URL,
  err => {
    if (err) {
      throw new Error(err.message);
      process.exit(1);
    } else {
      server.listen(PORT, () => console.log(`listening on ${PORT}`));
    }
  }
);

process.on("SIGINT", function() {
  process.exit();
});
