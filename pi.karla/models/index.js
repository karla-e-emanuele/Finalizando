"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const user = require("./user.model");

const db = {
  sequelize,
  Sequelize,
  user,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db; 