require("dotenv-flow").config();

module.exports = {
  development: {
    port: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
    jwtSecret: process.env.JWT_SECRET,
  },
  test: {},
};
