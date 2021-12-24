exports.up = async function (knex) {
  await knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("role_name", 128).notNullable();
    })

    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 128).notNullable().unique();
      users.string("email").notNullable().unique();
      users.string("password", 128).notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
