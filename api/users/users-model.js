const database = require("../../data//db-config.js");

function getAll() {
    return database("users")
}

function getBy(filter) {
    return database("users").where(filter)
}

function getById(user_id) {
    return database("users").where("users", user_id).first()
}

async function create(user) {
    const id = await database("users").insert(user)
    return getById(id)
}

module.exports = {
    getAll,
    getBy,
    getById,
    create
}

