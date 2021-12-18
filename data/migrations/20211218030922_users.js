
exports.up = async function(knex) {
  await knex.schema
  .createTable("users", (users) => {
    users.increments("user_id")
    users.string("username").notNullable().unique()
    users.string("password").notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists("users")
};
