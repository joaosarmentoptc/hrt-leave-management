// jest.setup.js
const { sequelize } = require("../../models");
const userFactory = require("../utils/userFactory");

async function initializeDatabase() {
  await userFactory(5);
}

module.exports = async () => {
  await sequelize.sync({ force: true });
  await initializeDatabase();
};
