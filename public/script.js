
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



