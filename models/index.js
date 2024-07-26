const { Sequelize } = require("sequelize");
const database = require("../configs/db");

const db = {};

db.User = require("./user")(database.sequelize, Sequelize.DataTypes);
db.UserManager = require("./userManager")(
  database.sequelize,
  Sequelize.DataTypes
);
db.LeaveRequest = require("./leaveRequest")(
  database.sequelize,
  Sequelize.DataTypes
);
db.LeaveBalance = require("./leaveBalance")(
  database.sequelize,
  Sequelize.DataTypes
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = database.sequelize;
db.Sequelize = Sequelize;

module.exports = db;
