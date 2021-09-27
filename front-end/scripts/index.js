console.log("Script chargé !");

// bringAllTeddies();
function bringAllTeddies() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET","http://localhost:3000/api/teddies");
  xhr.onload = function() {
    document.getElementById("teddies").innerHTML = "";
    let teddiesList = document.getElementById("teddies");
    if(this.status == 200) {
      console.log(this.responseText); // Affiche tous les teddies en forme de texte / string.
      const teddies = JSON.parse(this.responseText); // Converts string to JSON
      console.log(teddies); // Affiche tous les teddies sous forme d'Array sur la console.
      teddies.forEach(function(teddy) {
        teddiesList.innerHTML += `
        <tr>
            <td id = "${teddy._id}" class="teddyIdClass">${teddy._id}</td>
            <td>${teddy.name}</td>
            <td>${teddy.price}</td>
            <td> <img src="${teddy.imageUrl}" class = "img-teddy"> </td>
            <td><button class="selectThisTeddy">Sélectionner</button></td>
        </tr> `;
        const teddyId = document.getElementById(`${teddy._id}`);
        console.log(teddyId.id);
      });
    }
  }
  xhr.send();
}


// getArticlesXHR();
getArticlesFetch();

//Récupérer les articles depuis l'API via xhr
function getArticlesXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:3000/api/teddies");
    xhr.onload = function() {
      // document.querySelector(".products").innerHTML = "";
      // let productList = document.querySelector(".products");
      if(this.status == 200) {
        const articles = JSON.parse(this.responseText);
        articles.forEach(function(article) {
          // productList.innerHTML += `Salut!`
          let productCard = document.createElement("div");
          document.querySelector(".products").appendChild(productCard);
          productCard.classList.add("product");
    
          let productLink = document.createElement("a");
          productCard.appendChild(productLink);
          // productLink.href = `product.html?id=${article._id}`;
          productLink.href = `product.html?id=` + article._id;
    
          let productImgDiv = document.createElement("div");
          productLink.appendChild(productImgDiv);
          productImgDiv.classList.add("product__image");
    
          let productImg = document.createElement("img");
          productImgDiv.appendChild(productImg);
          productImg.src = article.imageUrl;
    
          let productInfo = document.createElement("div");
          productLink.appendChild(productInfo);
          productInfo.classList.add("product__info");
    
          let productName = document.createElement("p");
          productInfo.appendChild(productName);
          productName.classList.add("product__info--name");
          productName.innerHTML = article.name;
    
          let productPrice = document.createElement("p");
          productInfo.appendChild(productPrice);
          productPrice.classList.add("product__info--price");
          productPrice.innerHTML = (article.price)/100 + " €";
        })
      }
    }
    xhr.send();
}

//Récupérer les articles depuis l'API via fetch
function getArticlesFetch() {
  fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    return res.json();
  })
  .catch((error) => {
    console.log(error);
    let productsContainer = document.querySelector("#products__container");
    productsContainer.innerHTML = `Il y a eu un problème : ${error}`;
    productsContainer.style.padding = "40px";
  })

  // Dispatcher les données de chaque produit (nom, image, prix etc.)
  .then(function(resultsAPI) {
    const articles = resultsAPI;
    console.log(articles);

    for(let article in articles) {

      let productCard = document.createElement("div");
      document.querySelector(".products").appendChild(productCard);
      productCard.classList.add("product");

      let productLink = document.createElement("a");
      productCard.appendChild(productLink);
      productLink.href = `product.html?id=${resultsAPI[article]._id}`;

      let productImgDiv = document.createElement("div");
      productLink.appendChild(productImgDiv);
      productImgDiv.classList.add("product__image");

      let productImg = document.createElement("img");
      productImgDiv.appendChild(productImg);
      productImg.src = resultsAPI[article].imageUrl;

      let productInfo = document.createElement("div");
      productLink.appendChild(productInfo);
      productInfo.classList.add("product__info");

      let productName = document.createElement("p");
      productInfo.appendChild(productName);
      productName.classList.add("product__info--name");
      productName.innerHTML = resultsAPI[article].name;

      let productPrice = document.createElement("p");
      productInfo.appendChild(productPrice);
      productPrice.classList.add("product__info--price");
      // productPrice.innerHTML = (resultsAPI[article].price)/100 + " €";

      resultsAPI[article].price = (resultsAPI[article].price) / 100;

      // La fonction pour montrer les prix correctement : 
      productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(resultsAPI[article].price); // Affiche '39,00 €' au lieu de '39 €' par exemple
      
    }
  })
}

// Pour montrer le nombre de produit dans le panier à côté de l'icône de panier : 
const storage = new Storage();
storage.getItemQty();