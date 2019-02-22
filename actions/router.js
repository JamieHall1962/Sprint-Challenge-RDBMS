const express = require("express");

const actions = require("./actionsDbModel");

const router = express.Router();


// The C in CRUD


router.post("/", (req, res) => {
    const { project_id, description, notes } = req.body;
    const action = { project_id, description, notes };
  
    if (!project_id || !description || !notes) {
      return res.status(400).json({
        error:
          "To be considered valid, you must include the Project ID, a description and any Notes to be included"
      });
    }
    actions
      .createAction(action)
      .then(id => {
        res.status(201).json(id[0]);
      })
      .catch(err => {
        res.status(500).json({
            message:
              "Server Error. Unable to add the specified action"
          });
      });
  });

  // The R in CRUD

router.get("/", (req, res) => {
  actions
    .readAction()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => res.status(500).json({
        message:
          "Server Error. Unable to find the specified action"
      }));
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const action = await actions.readActionById(id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The specified action could not be found" });
    }
  } catch (error) {
    res.status(500).json({
        message:
          "Server Error. Unable to find the specified action"
      });
  }
});



module.exports = router;