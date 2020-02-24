
function paginate(selectedPage, totalPages) {
  let pages = [],
      oldPage;

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesBeforeSelectedPages = currentPage >= selectedPage - 2;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;

    if(firstAndLastPage || pagesBeforeSelectedPages && pagesAfterSelectedPage) {
      
      if(oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);

      oldPage = currentPage;
    }
  }

  return pages
}

const pagination = document.querySelector(".pagination")
const page = Number(pagination.dataset.page);
const total = Number(pagination.dataset.total);
const pages = paginate(page, total);

let elements = "";

for (let page of pages) {
  if(String(page).includes("...")) {
    elements += `<span>${page}</span>`
  } else {
    elements += `<a href="?page=${page}">${page}</a>`
  }
  
}
console.log(pages)
pagination.innerHTML = elements




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

