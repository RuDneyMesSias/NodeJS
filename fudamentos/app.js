var mostrarSite = true;
const site = "www.guiadoprogramador.com"

console.log("Hello world!")
console.log("Meu nome é Rudney Messias ")
console.log(" E eu estou aprendendo Node.Js com o Guia do programador");

if(mostrarSite) {   //Se mostrar site
    console.log(site)   //Print o site 
}

var modulo = require("./modulo")

console.log(modulo.mult(10,20))
console.log(modulo.soma(20,40))
modulo.nome = "Modulo do Victor!"
console.log(modulo.nome);
