const express = require("express");
const server = express();
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.use('*', (req, res)=>{
  res.send(`<h1> Welcome to What's Dat API! </h1>`)
})
// Error Handling
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

/**
 * const express = require("express");
const helmet = require("helmet");
const server = express();
const userRouter = require("./users/users-router.js");
const authRouter = require("./auth/auth-router.js");

server.use(helmet());
server.use(express.json());

server.use("/api/users", userRouter)
server.use("/api/auth", authRouter)

server.use('*', (req, res)=>{
  res.send(`<h1> Welcome to Anywhere Fitness' API! </h1>`)
})

// Error Handling
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

 */