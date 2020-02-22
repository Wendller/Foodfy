function addIngredient(classePai, classeFilho, name) {
  const ingredients = document.querySelector(classePai);
  const fieldContainer = document.querySelector(classeFilho);

  const newField = document.createElement("input");
  newField.placeholder = "Ingrediente";
  newField.name = name;

  if (!fieldContainer.value =="") {
    ingredients.appendChild(newField);
  }
}


document
  .querySelector(".add-ingredient")
  .addEventListener("click", function() {
    addIngredient(".ingrediente-container", ".ingrediente-input", "ingredients")
  });


document
  .querySelector(".add-instro")
  .addEventListener("click", function() {
    addIngredient(".prepare-container", ".prepare-input", "preparation")
  });
