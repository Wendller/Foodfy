Recipe = require("../models/Recipe");

module.exports = {

  index(req, res) {
    
    Recipe.all(function(receipts) {
      return res.render("recipes/index", { receipts })
    });

  },
  create(req, res) {
    return 
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    return
  },
  show(req, res) {
    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    return
  },
  delete(req, res) {
    return
  }
  
}

