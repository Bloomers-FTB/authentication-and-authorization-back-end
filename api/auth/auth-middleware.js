const jwt = require("jsonwebtoken");
const User = require("../users/users-model.js")
const { JWT_SECRET } = require("../../config");

const restrict = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
      return next({
        status: 401,
        message: "Token Required"
      })
    } jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {
        next({
          status: 401,
          message: "Token Invalid"
        })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  };
  
  const validateBody = (req, res, next) => {
    const { username, password } = req.body
    if(username === undefined || typeof username !== 'string' || 
      !username.trim() || password === undefined || 
      typeof password !== 'string' || !password.trim()
      ){
        next({
          status: 400,
          message: "Username, and Password required"
        })
      }else {
        next()
      }
  };
  
  const validateEmail = (req, res, next) => {
      const { email } = req.body
      if(email === undefined || typeof email !== 'string' ||
      !email.trim()) {
          next({
              status: 400,
              message: "Email is required"
          })
      } else {
          next()
      }
  }

  const validateRole = (req, res, next) => {
      const { role_id } = req.body
      if(role_id === undefined) {
          next({
              status: 400,
              message: "Role is required"
          })
      } else {
          next()
      }
  }
  
  const checkUsernameFree = async(req, res, next) => {
    const { username } = req.body
    const user = await User.getBy({ username: username})
    if(user.length){
      next({
        status: 422,
        message: "Username Taken"
      })
    } else {
      next()
    }
  };

  const checkEmailFree = async(req, res, next) => {
    const { email } = req.body
    const user = await User.getBy({ email: email})
    if(user.length){
      next({
        status: 422,
        message: "Email is taken"
      })
    } else {
      next()
    }
  };
  
  const validateUsername = async(req, res, next) => {
    const { username } = req.body
    const user = await User.getBy({ username: username })
    if(user.length){
      req.user = user[0]
      next()
    } else {
      next({
        status: 401,
        message: "Invalid Credentials"
      })
    }
  }
  
  
  module.exports = {
    restrict,
    validateBody,
    checkUsernameFree,
    checkEmailFree,
    validateUsername,
    validateEmail,
    validateRole
  };
  