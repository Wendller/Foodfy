// const desserts = require("../data");
const desserts = require("../data.json");
const recipes = desserts.recipes;
const fs = require("fs");

exports.index = function(req, res) {


  return res.render("index", { desserts: desserts.recipes })
}


exports.create = function(req, res) {
  return res.render("create")
}


exports.show = function(req, res) {
  //? Desestruturando ID
  const { id } = req.params;

  //? Procurando a receita pelo Id
  const foundRecipe = desserts.recipes.find(function(dessert) {
    return dessert.id == id
  });

  if (!foundRecipe) return res.send("Receita não encontrada.")

  return res.render("show", { recipe: foundRecipe })
}


exports.edit = function(req, res) {
  const { id } = req.params;

  const foundRecipe = desserts.recipes.find(function(dessert) {
    return dessert.id == id;
  });

  return res.render("edit", { dessert: foundRecipe })
}


exports.post = function(req, res) {
  //? Pegar as chaves do formulario
  const keys = Object.keys(req.body);

  //? Verificando se há conteudo
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Preencha todo os campos!")
    }
  }

  // //? Desestruturando os dados do formulario
  let id = 1;
  const lastMember = desserts.recipes[desserts.recipes.length - 1];

  if (lastMember) {
    id = Number(lastMember.id) + Number(1);
  }

  let ingredients = [];
  for (ingredient of req.body.ingredients) {
    ingredients.push(ingredient);
  }

  desserts.recipes.push({
    id,
    ...req.body,
    ingredients
  })
    
  //return res.send(object)

  fs.writeFile("src/data.json", JSON.stringify(desserts, null, 2), function(err) {
    if (err) return res.send(`Write file error:${err}`);

    return res.redirect("/admin/recipes")
  });


}


exports.put = function(req, res) {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = desserts.recipes.find(function(dessert, foundIndex) {
    if (dessert.id == id) {
      index = foundIndex
      return true
    }
  });

  if (!foundRecipe) return res.send("Receita não encontrada.")

  const recipe = {
    id: Number(req.body.id),
    ...foundRecipe,
    ...req.body
  }

  desserts.recipes[index] = recipe;

  fs.writeFile("src/data.json", JSON.stringify(desserts, null, 2), function(err) {
    if (err) return res.send(`Write file error:${err}`);

    return res.redirect("/admin/recipes")
  });
}


exports.delete = function(req, res) {
  const { id } = req.body;

  const filteredRecipes = desserts.recipes.filter(function(recipe) {
    return recipe.id != id
  });

  desserts.recipes = filteredRecipes;

  fs.writeFile("src/data.json", JSON.stringify(desserts, null, 2), function(err) {
    if (err) return res.send(`Write file error:${err}`);

    return res.redirect("/admin/recipes")
  });
  
}