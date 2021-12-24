const database = require("../../data/db-config.js");

function get() {
    return database("users as u")
      .leftJoin("roles as r", "u.role_id", "r.role_id")
      .select("u.user_id", "u.username", "u.email", "u.role_id", "r.role_name");
  }
  
  function getById(user_id) {
    return database("users as u")
      .leftJoin("roles as r", "u.role_id", "r.role_id")
      .select("u.user_id", "u.username", "u.email", "r.role_name")
      .where("u.user_id", user_id)
      .first()
  }
  
  function getBy(filter) {
      return database("users as u")
      .leftJoin("roles as r", "u.role_id", "r.role_id")
      .select("u.user_id", "u.username", "u.password", "u.email", "u.role_id", "r.role_name")
      .where(filter)
  }
  
  async function create(user) {
      const [id] = await database("users").insert(user)
      return getById(id)
  }
  
  module.exports = {
    get,
    getById,
    getBy,
    create,
  };
  

