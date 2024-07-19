const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV;
const { jwtSecret } = require("../../configs/config")[env];

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = verifyToken;
