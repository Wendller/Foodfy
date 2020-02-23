const desserts = require("../../lib/data.json");
const Home = require("../models/Home");

// Home page
exports.main = function(req, res) {
  const home = {

    slogan: "As melhores receitas",
    description: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro!",
    more: "Mais acessadas",
    favorites: [
      { name: "Triplo Bacon Burger", autor: "por Jorge Relato", image: "/images/burger.png" },
      { name: "Pizza 4 estações", autor: "por Fabiana Melo", image: "/images/pizza.png" },
      { name: "Espaguete ao alho", autor: "por Júlia Kinoto", image: "/images/espaguete.png" },
      { name: "Lasanha mac n` cheese", autor: "por Juliano Vieira", image: "/images/lasanha.png"} ,
      { name: "Docinhos pão-do-céu", autor: "por Ricardo Golvea", image: "/images/doce.png" },
      { name: "Asinhas de frango ao barbecue", autor: "por Vania Steroski", image: "/images/asinhas.png" }
    ]

  }


  return res.render("main/home", { home })
}

// Sobre page
exports.about = function(req, res) {
  
  const about = {
    title: "Sobre o Foodfy",
    text_one: "A culinária é a arte de cozinhar ou confeccionar alimentos e foi evoluindo de acordo com a história da humanidade e possui características diferentes em cada cultura. A culinária reflete os costumes de um povo e também se reflete em outros aspectos culturais como as religiões e a política.Não somente os alimentos, mas também os utensílios e as técnicas utilizados na culinária fazem parte de um acervo cultural particular.",
    begin: "Como tudo começou...",
    text_two: "De acordo com as mudanças comportamentais da humanidade, e com o advento da sociedade industrializada, com as pessoas trabalhando longe de casa e sem tempo para cozinhar e fazer suasrefeiçõessurgiu a necessidade da comida rápida – ou fast food. Em contrapartida,com as mudanças nos costumes alimentares das pessoas também surgiram novas regras, e até mesmo leis,para a regulamentação da produção e venda dos alimentos da sociedade industrializada. ",
    our_foods: "Nossas receitas",
    text_three: "As técnicas e utensílios culinários variam de acordo com a cultura e se adaptam à disponibilidade de ingredientes e costumes de cada povoO primeiro utensílio culinário foi a própria mão, ainda quando se consumiam alimentos crus.Com o advento do fogo, o homem sentiu a necessidade de criar utensílios para mexer a comida, já que as altas temperaturas não permitiam o manuseio.Foi então que ocorreu a descoberta da cerâmica e a produção das primeiras panelas e recipientes para o armazenamento de água."
  }


  return res.render("main/about", { about })
};

// Menu page
exports.menu = function(req, res) {
  

  Home.all(function(foods) {
    return res.render("main/menu", { foods })
  });


  
};

// Recipe page
exports.recipes = function(req, res) {
  const recipeIndex = req.params.index;

  const recipe = desserts.recipes.find(function(recipe) {
    return recipe.id == Number(recipeIndex);
  });

  if (!recipe) {
    return res.send("Dessert not found!")
  }

  return res.render("main/foodtest", { recipe })

}