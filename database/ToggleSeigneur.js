const Sequelize = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'sqlite',
  logging: false,
  storage: process.env.DB_STORAGE,
});

const Seigneur = sequelize.define('seigneurs', {
  guildId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

(async () => {
  console.log("Starting sync...");
  await Seigneur.sync();
  console.log("Database is synced");
})();

module.exports = {Seigneur};