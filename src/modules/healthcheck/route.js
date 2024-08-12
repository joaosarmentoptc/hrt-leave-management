/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Hello, Chloé. I'm healthy, how 'bout you?",
    timestamp: Date.now(),
  };
  res.send(healthcheck);
});

module.exports = router;
