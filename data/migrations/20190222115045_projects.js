exports.up = function(knex, Promise) {
    return knex.schema.createTable("projects", function(tbl) {
      tbl.increments();
  
      tbl.string("name", 128).notNullable().unique();
  
       
      tbl.string("description", 255).notNullable();
  
      tbl.boolean("complete").defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("projects");
  };