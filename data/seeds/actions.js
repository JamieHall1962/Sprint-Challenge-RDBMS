
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: 1, description: 'Initiate, structure and Migrate', notes: "Some Notes"},
        {project_id: 1, description: 'Write routes and models', notes: "Some more Notes"},
        {project_id: 1, description: 'Seed and Test', notes: "Even more Notes"},
        {project_id: 2, description: 'Mow the Yard', notes: "Some Notes"},
        {project_id: 2, description: 'Do the trimming', notes: "Some more Notes"},
        {project_id: 2, description: 'Edge the surface areas', notes: "Even more Notes"},
        {project_id: 3, description: 'Make the Dough', notes: "Some Notes"},
        {project_id: 3, description: 'Make the sauce', notes: "Some more Notes"},
        {project_id: 3, description: 'Prepare the pizza and bake', notes: "Even more Notes"},
      ]);
    });
};
