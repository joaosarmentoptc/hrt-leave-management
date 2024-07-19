const { Sequelize } = require("sequelize");
const config = require("./config");

const env = process.env.NODE_ENV;
const dbConfig = config[env];

class Database {
  constructor() {
    if (!Database.instance) {
      this.sequelize = new Sequelize(
        dbConfig.dbName,
        dbConfig.dbUsername,
        dbConfig.dbPassword,
        {
          host: dbConfig.dbHost,
          dialect: dbConfig.dbDialect,
          port: dbConfig.dbPort,
        }
      );
      Database.instance = this;
    }
  }

  static getInstance() {
    if (!Database.instace) {
      Database.instace = new Database();
    }
    return Database.instance;
  }
}

const instance = Database.getInstance();
Object.freeze(instance);

module.exports = instance;
