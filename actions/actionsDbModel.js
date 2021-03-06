// - [ ] Build the database and tables using knex migrations. **Seeding is not needed**.
// - [ ] Build the API with the following endpoints:

//   - [ ] POST for adding projects.
//   - [ ] POST for adding actions.
//   - [ ] GET for retrieving a `project` by its `id` that returns an object with the following structure:

// ```js
// {
//   id: 1,
//   name: 'project name here',
//   description: 'the project description',
//   completed: false, // or true, the database will return 1 for true and 0 for false
//   actions: [
//     {
//       id: 1,
//       description: 'action description',
//       notes: 'the action notes',
//       completed: false // or true
//     },
//     {
//       id: 7,
//       description: 'another action description',
//       notes: 'the action notes',
//       completed: false // or true
//     }
//   ]
// }
// ```


const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  createAction,
  readAction,
  readActionById
};

function createAction(action) {
    return db("actions")
      .insert(action)
      .into("actions");
  }

function readAction() {
  return db("actions");
}
function readActionById(id) {
  return db("projects")
    .where({ id })
    .first();
}

