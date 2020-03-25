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
      if (req.body[key] == "" && key != "information") {
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


    return res.redirect(`/admin/recipes/${recipeId}/edit`);

  },
  show(req, res) {

    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send("Receita não encontrada!")

      return res.render("recipes/show", { recipe })
    });

  },
  async edit(req, res) {

    //? get Recipe
    let results = await Recipe.find(req.params.id);
    dessert = results.rows[0];
    dessertId = results.rows[0].id;

    //? get Chefs options
    results = await Recipe.chefsSelectOptions();
    chefOptions = results.rows;

    //? get Images
    results = await Recipe.files(dessertId);
    let files = results.rows;
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }));


    return res.render("recipes/edit", { dessert, chefOptions, files });

  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "" && (key != "removed_files" && key != "information") ) {
        return res.send("Preencha todo os campos!")
      }
    }

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => 
        File.create({...file}, req.body.id));
        
      await Promise.all(newFilesPromise);
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",");
      const lastIndex = removedFiles.length - 1;
      removedFiles.splice(lastIndex, 1);

      const removedFilesPromise = removedFiles.map(id => File.delete(id));

      await Promise.all(removedFilesPromise);
    }

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}/edit`)
  
  },
  async delete(req, res) {
    
    await Recipe.delete(req.body.id);

    return res.redirect("/admin/recipes");
  }
  
}

