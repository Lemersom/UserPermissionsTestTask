const { DataTypes } = require('sequelize');
const sequelize = require('../helper/database')

const UserModel = sequelize.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isEditor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        canEditFirstName: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        canEditEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

module.exports = UserModel;