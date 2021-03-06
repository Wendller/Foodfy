const Chef = require("../models/Chef");

module.exports = {

  index(req, res) {
    
    Chef.all(function(chefs) {
      return res.render("chefs/index", { chefs })
    });

  },
  create(req, res) {
    
    return res.render("chefs/create")

  },
  post(req, res) {
    const keys = Object.keys(req.body);

    //? Verificando se há conteudo
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todo os campos!")
      }
    }

    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${chef.id}`)
    });
  },
  show(req, res) {
    
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef não encontrado!")
      Chef.findMyFood(req.params.id, function(receipts) {
        list = [];
        for(receipt of receipts) {
          list.push(receipt.idd)
        }
        total = list.length;
        return res.render("chefs/show", { chef, receipts, total })
      });
    });

  },
  edit(req, res) {
    
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef não encontrado!")

      return res.render("chefs/edit", { chef })
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

    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    });
  },
  delete(req, res) {
    
    Chef.delete(req.body.id, function() {
      return res.redirect("/admin/chefs")
    });

  }
  
}
