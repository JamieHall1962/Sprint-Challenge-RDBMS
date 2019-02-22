const express = require("express");

const projects = require("./projectsDbModel");

const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const router = express.Router();

// The C in CRUD

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const project = { name, description };

  if (!name || !description) {
    return res.status(400).json({
      error:
        "To be considered valid, the Project must have a name and a description"
    });
  }
  projects
    .createProject(project)
    .then(id => {
      res.status(201).json(id[0]);
    })
    .catch(err => {
      res.status(500).json({
        message: "Server Error. Unable to add the Project"
      });
    });
});

// The R in CRUD

router.get("/", (req, res) => {
  projects
    .readProject()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err =>
      res.status(500).json({
        message: "Server Error. Unable to read Projects"
      })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("projects")
    .where({ id })
    .first()
    .then(projects => {
      if (projects) {
        db("actions")
          .where("project_id", id)
          .then(actions => {
            projects.actions = actions;
            res.json(projects);
          });
      } else {
        res
          .status(404)
          .json({ message: "Unable to find the specified project" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Server Error. Project could not be retrieved" })
    );
});

module.exports = router;
