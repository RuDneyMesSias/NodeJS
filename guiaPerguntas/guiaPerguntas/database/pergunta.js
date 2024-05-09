const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
    titulo:{ 
        type: Sequelize.STRING,
        AllowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        AllowNull: false
    }
});

Pergunta.sync({force: false}).then(()=> {});

module.exports = Pergunta