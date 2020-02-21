const express = require("express");
const routes = express.Router();
const home = require("./controllers/home");
const recipes = require("./controllers/recipes");


routes.get("/", home.main);
routes.get("/about", home.about);
routes.get("/menu", home.menu);
routes.get("/recipes/:index", home.recipes);


routes.get("/admin/recipes", recipes.index); //? Exibe a lista de receitas
routes.get("/admin/recipes/create", recipes.create); //? Formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); //? Detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); //? Formulario de edição de receita
routes.post("/admin/recipes", recipes.post); //? Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); //? Editar uma recita
routes.delete("/admin/recipes", recipes.delete); //? Deletar uma receita


module.exports = routes;