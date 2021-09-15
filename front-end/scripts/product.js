console.log("Script chargé !");

let params = new URL(document.location).searchParams;
let id = params.get("id");

// Pour donner le nom du produit à la page :
const pageTitle = document.querySelector("title");

const container = document.querySelector(".container");
const productDiv = document.querySelector(".product");
const productImg = document.querySelector(".img");
const productName = document.querySelector(".product__name");
const productPrice = document.querySelector(".product__price");
const productDescription = document.querySelector(".product__description");
const productColor = document.querySelector("#color");
const productQuantity = document.querySelector("#quantity");

const addToBasketBtn = document.querySelector(".add-to-basket");
const successMsg = document.querySelector(".added__msg");
const successMsgText = document.querySelector(".added__msg--text");

getArticle(id);

// La fonction pour voir les détailles du produit choisi sur sa propre page :
function getArticle(id) {
  fetch(`http://localhost:3000/api/teddies/${id}`)
  
    //   .then(function (response) {
    //     console.log(response); //Logs a response, type 'cors'
    //     return response.json();
    //   })
    
    .then(response => response.json())
    
    .catch((error) => {
      console.log(error);
      container.innerHTML = "Problème de serveur";
      container.style.textAlign = "center";
      container.style.padding = "40px";
    })
    
    // Récuperer et afficher les infos du produit choisi
    .then(article => {
      // console.log(article);
      pageTitle.innerHTML = article.name + " | Orinoco";
      productDiv.id = article._id;
      productName.innerHTML = article.name;
      productDescription.innerHTML = article.description;
      productImg.src = article.imageUrl;
      // productPrice.innerHTML = article.price/100 + " €"
      article.price = article.price / 100;
      productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);
      
      for(let i = 0; i < article.colors.length; i++) {
        let colorOption = document.createElement("option");
        colorOption.innerHTML = article.colors[i];
        productColor.appendChild(colorOption);
      }
    });
  }

  // -------- Local Storage ----------

  const storage = new Storage();
  let itemsArray = storage.getItemsFromLS();