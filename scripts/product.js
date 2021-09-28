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

// const addToBasketBtn = document.querySelector(".add-to-basket");

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
      container.innerHTML = `Il y a eu un problème : ${error}`;
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

  // -------- Local Storage ----------

  const storage = new Storage();
  let itemsArray = storage.getItemsFromLS();

  // Pour afficher le nombre de produit dans le panier à côté de l'icône de panier
  storage.getItemQty();

  function addToBasket() {
    console.log("Product ID : " + productDiv.id +", Product quantity: " + productQuantity.value + ", Product color: " + productColor.value);
  
    // Création d'un nouvel élément à mettre dans le panier:
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
    console.log(newItem._id);
  
    // Pour ajouter le premier élément au panier qui est vide :
    if(itemsArray.length === 0) {
      itemsArray.push(newItem);
      console.log("Le premier élément a été ajouté au panier");
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