/** Application for bank.ly */

const express = require('express');
const app = express();
const ExpressError = require("./helpers/expressError");
const { authenticateJWT } = require("./middleware/auth");


app.use(express.json());
app.use(authenticateJWT);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);
    
  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;