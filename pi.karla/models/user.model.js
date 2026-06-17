const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const user = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },

        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },

        email: {
        type:DataTypes.STRING,
        allowNull: false, 
        unique: true
        },
    },
    
    {
        tableName: "users",
        timestamps: true,
    },
);   



module.exports = user;