/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const verifyToken = require("./src/middlewares/auth");

const app = express();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getRoute = (name) => require(`./src/modules/${name}/route`);

app.use("/healthcheck", getRoute("healthcheck"));
app.use("/leaves/requests", verifyToken, getRoute("leaverequests"));
app.use("/leaves/balance", verifyToken, getRoute("leavebalance"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
