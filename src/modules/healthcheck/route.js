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
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(500).send();
  }
});

module.exports = router;
