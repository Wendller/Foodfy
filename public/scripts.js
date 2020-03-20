//? LOGICA PARA UPLOAD DE IMAGENS

const PhotosUpload = {

  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target;
    
    if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);

        PhotosUpload.preview.appendChild(div);
      }

      reader.readAsDataURL(file)
    });
  },
  hasLimit(event) {
    const { uploadLimit } = PhotosUpload;
    const { files: fileList } = event.target;

    if(fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault();
      return true
    }

    return false
  },
  getContainer(image) {
    const div = document.createElement('div');
        div.classList.add('photo');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);

        div.appendChild(PhotosUpload.getRemoveButton());

        return div
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = "close";

    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    photoDiv.remove();
  }
  
}


//? LOGICA PARA PAGINACAO

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


//? LOGICA PARA ADICAO DE INGREDIENTES

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

