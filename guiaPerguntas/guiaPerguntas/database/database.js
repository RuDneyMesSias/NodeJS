const Sequelize = require('sequelize');

const connection = new Sequelize('guiaPerguntas', 'root', '8687260',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connection;