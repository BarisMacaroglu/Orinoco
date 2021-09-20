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

  // Pour afficher le nombre d'articles dans le Local Storage à côté d'icon de panier
  storage.getItemQty();

  addToBasketBtn.addEventListener("click", () => {
    
    if(productQuantity.value > 0 && productQuantity.value <=100) {

      successMsg.style.visibility = "hidden";

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

      console.log("A new item has been created :");
      console.log(newItem);
      console.log(newItem._id);


      if(itemsArray.length === 0) {
        itemsArray.push(newItem);
        console.log("The new item has been added to the Local Storage");
      } else {

        // let controlArr = [];
        let controlArr = false;
  
        itemsArray.forEach(function(item) {
          //Si le même ID et couleur existent déjà dans le panier, on augmente sa quantité:
          if((item._id === newItem._id) && (item.color === newItem.color)) {
            // controlArr.push(1);
            item.quantity += newItem.quantity;
            controlArr = true;
          }
          // if(item._id !== newItem._id) {
          //   controlArr.push(0);
          // }
        });
  
        // if(!(controlArr.includes(1))) {
        //   console.log("Cet élément n'existe pas, donc push le !");
        //   itemsArray.push(newItem);
        // }
        if(controlArr === false) {
          itemsArray.push(newItem);
        }
        
      }
      
      // Actualisation de LocalStorage
      localStorage.setItem("itemsArray", JSON.stringify(itemsArray));

      successBox();
      
    }
    else {
      console.log("productQuantity value invalid");
      successMsg.style.visibility = "visible";
      successMsgText.innerHTML = `Sélectionnez une quantité entre 1 et 100 s'il vous plaît`;
      productQuantity.value = 1;
    }
  });

  function successBox() {

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
      // confirmationContainer.style.visibility = "hidden";
      setTimeout("location.reload(true);", 10);
    });

    // addToBasketBtn.style.visibility = "hidden";
    // successMsg.style.visibility = "visible";
    // successMsgText.innerHTML = `${productQuantity.value} ${productName.innerHTML} (${productColor.value}) a été ajouté au panier !`;
    // setTimeout("location.reload(true);", 2000);
}