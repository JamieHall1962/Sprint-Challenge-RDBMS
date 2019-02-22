
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Sprint Challenge', description: "Describe how to complete the Sprint Challenge"},
        {name: 'Do Lawn', description: "List the steps required to complete the lawn"},
        {name: 'Make Pizza', description: "How to make a pizza. Mine will be Detroit Style"}
      ]);
    });
};
