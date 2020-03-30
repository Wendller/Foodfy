const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll(".gallery-preview img"),
  setImage(event) {
    const { target } = event;

    ImageGallery.previews.forEach(preview => preview.classList.remove("active"));
    target.classList.add("active");

    ImageGallery.highlight.src = target.src;
  }
}



const buscando = document.querySelector(".buscando")
const botao = document.querySelector(".botao-buscar")
const filtre = document.querySelector(".input-buscar")



const foods = document.querySelectorAll('.food-revenue');

const esconder = document.querySelector(".ingredientes-head p");
const esconder_one = document.querySelector(".modopreparo-head p");
const esconder_two = document.querySelector(".info-head p");
const ingredients = document.querySelector(".ingredientes-list");
const prepareList = document.querySelector(".modopreparo-list");
const prepareMode = document.querySelector(".info-list");



function show(topic, message) {
  message.addEventListener("click", function() {
    if (message.innerHTML == "Esconder") {
      topic.classList.add("hidden");
      message.innerHTML = "Mostrar"
    } else {
      topic.classList.remove("hidden");
      message.innerHTML = "Esconder"
    }
  });
}

for (let food of foods) {
  food.addEventListener("click", function() {
    const foodId = food.getAttribute("id");
    
    window.location.href = `/recipes/${foodId}`
    
  });
}


show(ingredients, esconder);
show(prepareList, esconder_one);
show(prepareMode, esconder_two);





