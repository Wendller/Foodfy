const Recipe = require("../models/Recipe");
const File = require("../models/File");

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
  async post(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    if(req.files.length == 0) {
      return res.send("Envie pelo menos uma imagem")
    }

    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;

    const filesPromise = req.files.map(file => File.create({...file}, recipeId));

    await Promise.all(filesPromise);


    return res.redirect(`/admin/recipes/${recipeId}`)

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
  async put(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`)
  
  },
  async delete(req, res) {
    
    await Recipe.delete(req.body.id);

    return res.redirect("/admin/recipes");
  }
  
}

