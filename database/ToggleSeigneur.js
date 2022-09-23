const Sequelize = require('sequelize');
const { database } = require('../config.json');

const sequelize = new Sequelize(database.name, database.username, database.password, {
  host: database.host,
  dialect: 'sqlite',
  logging: false,
  storage: database.storage,
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