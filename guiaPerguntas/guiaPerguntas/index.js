const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta =require("./database/pergunta");
const Resposta = require("./database/Resposta");

//Database

connection.authenticate()
    .then(()=> {
        console.log("Conexão feita com banco de dados! ")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// O Express usar o EJS com view engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Rotas
app.get("/",(req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']          //ASC => Crescente || DESC => Decrescente
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});


app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});


app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Pegunta encontrada
            res.render("pergunta", {
                pergunta: pergunta
            });

        }else{  // Não encontrada 
            res.redirect("/");
        }
    });
});


app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }). then(() => {
        res.redirect("/pergunta/"+perguntaId);

    });
});


/**************   tipos de rotas   **********************************/



//render diferentes html
app.get("/home",(req, res) => {
    res.render("home")
})

//render em arquivo em pastas
app.get("/pastas", (req, res) => {
    res.render("principal/perfil")
})

//render parâmetros html Dinâmico 
app.get("/variavel", (req, res) => {
    var nome = "Rudney Messias";
    var lang = "javaScript";
    res.render("principal/variavel",{
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8050
    });
})

app.get("/parametro/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;

    res.render("principal/variavel",{
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8050
    });
})

app.get("/condicionais/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;

    res.render("principal/condicionais",{
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8050,
        msg: exibirMsg

    });
})

app.get("/repeticoes/:nome/:lang", (req, res) => {
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = true;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco:1.45},
        {nome: "Carne", preco: 15},
        {nome: "Redbull", preco: 9.90},
        {nome: "Nescal", preco: 10}
    ]

    res.render("principal/repeticao",{
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8050,
        msg: exibirMsg,
        produtos: produtos

    });
})

app.listen(8080,() => {
    console.log("App Rodando!");
});