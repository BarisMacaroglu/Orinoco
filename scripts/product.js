console.log("Script chargé !");

let params = new URL(document.location).searchParams;
let id = params.get("id");

// Pour nommer la page dynamiquement :
const pageTitle = document.querySelector("title");

const mainContainer = document.querySelector(".container-main");
const productDiv = document.querySelector(".product");
const productImg = document.querySelector(".img");
const productName = document.querySelector(".product__name");
const productPrice = document.querySelector(".product__price");
const productDescription = document.querySelector(".product__description");
const productColor = document.querySelector("#color");
const productQuantity = document.querySelector("#quantity");
const storage = new Storage();


main();

function main() {
  storage.getItemQty(); // Pour afficher le nombre de produit dans le panier à côté de l'icône de panier
  check404();  // Pour vérifier si la page existe ou pas
  getArticle(id); // Pour afficher les détailles et les variétés du produit choisi
}

function check404() {
  window.addEventListener("error", (e) => {
      mainContainer.innerHTML = `<p>La page que vous cherchez n'a pas été trouvée. <br><br> <a href="index.html">Retourner à la page d'accueil Orinoco </a></p>`;
      mainContainer.style.padding = "25vh 0";
      mainContainer.style.fontSize = "25px";
      mainContainer.style.textAlign = "center";
    },
    true
  );
}

function getArticle(id) {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    
    .then(response => response.json())
    
    .catch((error) => {
      console.log(error);
      mainContainer.innerHTML = `Il y a eu un problème : ${error}`;
      mainContainer.style.textAlign = "center";
      mainContainer.style.padding = "25vh 0";
      mainContainer.style.fontSize = "25px";
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

      for(let i = 1; i <= 100; i++) {
        let quantityOption = document.createElement("option");
        quantityOption.innerHTML = i;
        productQuantity.appendChild(quantityOption);
      }

      const addToBasketBtn = document.createElement("button");
      document.querySelector(".product__button").appendChild(addToBasketBtn);
      addToBasketBtn.classList.add("btn");
      addToBasketBtn.innerHTML = "Ajouter au panier";
      addToBasketBtn.addEventListener("click", addToBasket);

    });
}

function addToBasket() {

    // Création d'un nouvel élément à mettre dans le panier :
    let newItem = {
      _id : id,
      name : productName.innerHTML,
      price : parseFloat(productPrice.innerHTML),
      imageUrl : productImg.src,
      color : productColor.value,
      quantity : parseInt(productQuantity.value)
    };
  
    console.log("Un nouvel élément a été créé : ");
    console.log(newItem);
  
    let itemsArray = storage.getItemsFromLS();

    // Pour ajouter le premier élément au panier qui est vide :
    if(itemsArray.length === 0) {
      itemsArray.push(newItem);
    } else {

      // On teste si le produit est déjà présent (même ID, même couleur), donc on parcourt l'itemsArray avec forEach et compare ID et couleurs de chaque élément du tableau.
      // Si l'ID et la couleur sont identiques, on incrémente le nombre du produit existant, sinon on ajoute une nouvelle ligne au panier.
      let isTheSame = false;

      itemsArray.forEach(function(item) {
        if((item._id === newItem._id) && (item.color === newItem.color)) {
          isTheSame = true;
          item.quantity += newItem.quantity;
        }
      });

      // On ajoute une nouvelle ligne au panier : 
      if(isTheSame === false) {
        itemsArray.push(newItem);
      }
    }
    
    // Actualisation de LocalStorage
    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));

    confirmationBox();
}

function confirmationBox() {

  const confirmationContainer = document.querySelector(".confirmation__container");
  const closeBoxBtn = document.querySelector(".close__box");
  const confirmationText = document.querySelector(".confirmation__product--infos");
  const imgInBox = document.querySelectorAll(".img")[1];

  confirmationContainer.style.visibility = "visible";
  productDiv.style.visibility = "hidden";

  imgInBox.src = productImg.src;
  let subTotal = parseFloat(productPrice.innerHTML)*(productQuantity.value);

  confirmationText.innerHTML = `${productQuantity.value} x ${productName.innerHTML} (${productColor.value}) :  <b> ${ new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(subTotal)} <b>`;

  closeBoxBtn.addEventListener("click", () => {
    setTimeout("location.reload(true);", 10);
  });
}