const { DataTypes } = require('sequelize')

const sequelize = require('../helpers/database')

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Comment