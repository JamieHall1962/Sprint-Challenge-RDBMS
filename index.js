// https://github.com/JamieHall1962/Sprint-Challenge-RDBMS/pull/1

const express = require("express");
const helmet = require("helmet");

const projectsRoutes = require("./projects/router");
const actionsRoutes = require("./actions/router");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectsRoutes);
server.use("/api/actions", actionsRoutes);

const port = 4000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});