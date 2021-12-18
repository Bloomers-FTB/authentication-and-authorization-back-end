const express = require("express");

const server = express()

server.use(express.json())

// Error Handling
server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server