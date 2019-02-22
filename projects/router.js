const express = require("express");

const projects = require("./projectsDbModel");
const actions = require("../actions/actionsDbModel");

const router = express.Router();

// The C in CRUD


router.post("/", (req, res) => {
    const { name, description } = req.body;
    const project = { name, description };
  
    if (!name || !description) {
      return res.status(400).json({
        error: "To be considered valid, the Project must have a name and a description"
      });
    }
    projects
      .createProject(project)
      .then(id => {
        res.status(201).json(id[0]);
      })
      .catch(err => {
        res.status(500).json({
            message:
              "Server Error. Unable to add the Project"
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
    .catch(err => res.status(500).json({
        message:
          "Server Error. Unable to read Projects"
      }));
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projects.readProjectById(id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project with the specified ID could not be found" });
    }
  } catch (error) {
    res.status(500).json({
        message:
          "Server Error. Unable to find the specified project"
      });
  }
});


router.get("/:id/actions", (req, res) => {
  actions
    .readActionsByProjectId(req.params.id)
    .then(action => {
      if (action.length > 0) {
        res.json(action);
      } else
        res.status(404).json({
          message: "Unable to locate the action data for the specified Project ID"
        });
    })
    .catch(err =>
      res.status(500).json({
        error: "Server Error. Action data could not be retrieved"
      })
    );
});



module.exports = router;