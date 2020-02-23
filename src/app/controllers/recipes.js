Recipe = require("../models/Recipe");

module.exports = {

  index(req, res) {
    
    Recipe.all(function(receipts) {
      return res.render("recipes/index", { receipts })
    });

  },
  create(req, res) {

    Recipe.chefsSelectOptions(function(chefOptions) {
      return res.render("recipes/create", { chefOptions })
    });
    
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    });
  },
  show(req, res) {

    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send("Receita não encontrada!")

      return res.render("recipes/show", { recipe })
    });

  },
  edit(req, res) {
    
    Recipe.find(req.params.id, function(dessert) {
      Recipe.chefsSelectOptions(function(chefOptions) {
        return res.render("recipes/edit", { dessert, chefOptions })
      });
    });

  },
  put(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    });
  },
  delete(req, res) {
    
    Recipe.delete(req.body.id, function() {
      return res.redirect("/admin/recipes");
    });

  }
  
}

