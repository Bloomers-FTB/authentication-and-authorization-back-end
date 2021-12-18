
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'Mark', password: "1234"},
        {user_id: 2, username: 'Julian', password: "1234"},
        {user_id: 3, username: 'Erwin', password: "1234"},
        {user_id: 4, username: 'Mavie', password: "1234"},
        {user_id: 5, username: 'Atris', password: "1234"},
        {user_id: 6, username: 'Ernanette', password: "1234"},
      ]);
    });
};
