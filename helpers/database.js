const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('article_app', 'root', 'amaterasu', {
    dialect: 'mysql',
    'host': '127.0.0.1'
})

module.exports = sequelize