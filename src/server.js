// Importando modulos
const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");

// Criando servidor
const server = express();

// Configure do server para utilizacao de arquivos estaticos
server.use(express.urlencoded({ extended: true }));
server.use(express.static("src/public"));
server.use(methodOverride('_method'));
server.use(routes);

// Configure do Nunjucks - View engine
server.set("view engine", "njk");

nunjucks.configure("src/views", {
  express: server,
  autoescape: false,
  noCache: true
});


// Inicia servidor
server.listen(5555, function() {
  console.log("The server is running!");
});