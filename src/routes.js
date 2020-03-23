const express = require("express");
const routes = express.Router();
const multer = require("./app/middlewares/multer");
const home = require("./app/controllers/home");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");


routes.get("/", home.main);
routes.get("/about", home.about);
routes.get("/menu", home.menu);
routes.get("/recipes/:index", home.recipes);


routes.get("/admin/recipes", recipes.index); //? Exibe a lista de receitas
routes.get("/admin/recipes/create", recipes.create); //? Formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); //? Detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); //? Formulario de edição de receita
routes.post("/admin/recipes", multer.array("photos", 5), recipes.post); //? Cadastrar nova receita
routes.put("/admin/recipes", multer.array("photos", 5), recipes.put); //? Editar uma recita
routes.delete("/admin/recipes", recipes.delete); //? Deletar uma receita


routes.get("/admin/chefs", chefs.index); //! Exibe a lista de chefs
routes.get("/admin/chefs/create", chefs.create); //! Formulário de novo chef
routes.get("/admin/chefs/:id", chefs.show); //! Detalhes de um chef
routes.get("/admin/chefs/:id/edit", chefs.edit); //! Formulario de edição de chef
routes.post("/admin/chefs", chefs.post); //! Cadastrar novo chef
routes.put("/admin/chefs", chefs.put); //! Editar um chef
routes.delete("/admin/chefs", chefs.delete); //! Deletar um chef

module.exports = routes;