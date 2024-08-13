const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV;
const { jwtSecret } = require("../../configs/config")[env];

const { User } = require("../../models");

function signedJwt(user) {
  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: "15m" }
  );
}

async function getUserWithNoBalance() {
  const user = await User.findByPk(1);
  return signedJwt(user);
}

module.exports = {
  getUserWithNoBalance,
};
