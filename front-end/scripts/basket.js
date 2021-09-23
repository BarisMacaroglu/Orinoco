console.log("Script chargé !");

const basketSection = document.querySelector("#basket");
const contactSection = document.querySelector("#contact");
const emtpyBasket = document.querySelector(".if-basket-empty");
const totalPriceDiv = document.querySelector(".bill__info--total");
const clearBasketBtn = document.querySelector(".clear__basket--btn");

const storage = new Storage();
let articlesArray = storage.getItemsFromLS();
storage.getItemQty();


document.addEventListener("DOMContentLoaded", () => {
    if((articlesArray === null) || (articlesArray.length === 0)) {
        // Si le LocalStorage est vide, on affiche seulement un message comme : "votre panier est vide"
        basketSection.style.display = "none";
        contactSection.style.display = "none";
    }
    else {
        // S'il y a quelque chose dans le panier, on supprime le message : "votre panier est vide" et on affiche les produits et le formulaire de contact.
        emtpyBasket.style.display = "none";

        // On affiche le nombre d'article total dans le panier
        const itemQty = articlesArray.length;
        const titleSpan = document.createElement("span");
        document.querySelector(".basket__title").appendChild(titleSpan);
        titleSpan.classList.add("itemQty");
        titleSpan.innerHTML = `(${itemQty})`;

        let totalPrice = 0;
        
        // On parcourt le tableau articlesArray et crée une ligne (Une div avec des infos dedans) pour chaque produit dans le panier
        articlesArray.forEach(function(article) {
            
            let productDiv = document.createElement("div");
            document.querySelector(".products").appendChild(productDiv);
            productDiv.classList.add("product");
            productDiv.id = article._id;
            
            let productInfoDiv = document.createElement("div");
            productDiv.appendChild(productInfoDiv);
            productInfoDiv.classList.add("product__info");

            let productImgDiv = document.createElement("a");
            productInfoDiv.appendChild(productImgDiv);
            productImgDiv.classList.add("product__info--image");
            productImgDiv.href = `product.html?id=${article._id}`;
            productImgDiv.title = "Aller sur la page du produit";
            
            let productImg = document.createElement("img");
            productImgDiv.appendChild(productImg);
            productImg.classList.add("img");
            productImg.src = article.imageUrl;
            
            let productTextDiv = document.createElement("div");
            productInfoDiv.appendChild(productTextDiv);
            productTextDiv.classList.add("product__info--text");
            
            let productTitle = document.createElement("div");
            productTextDiv.appendChild(productTitle);
            productTitle.classList.add("product__title");

            let productName = document.createElement("h1");
            productTitle.appendChild(productName);
            productName.classList.add("product__name");
            productName.innerHTML = article.name;
            
            let productColor = document.createElement("p");
            productTextDiv.appendChild(productColor);
            productColor.classList.add("product__color");
            productColor.innerHTML = article.color;

            let productQuantity = document.createElement("p");
            productTextDiv.appendChild(productQuantity);
            productQuantity.classList.add("product__quantity");
            productQuantity.innerHTML = "Quantité : " + article.quantity;

            let productButtons = document.createElement("div");
            productTextDiv.appendChild(productButtons);
            productButtons.classList.add("product__buttons");

            let productDeleteBtn = document.createElement("button");
            productButtons.appendChild(productDeleteBtn);
            productDeleteBtn.classList.add("delete__article");
            productDeleteBtn.innerHTML = "Supprimer cet article";

            let productPrice = document.createElement("h3");
            productTitle.appendChild(productPrice);
            productPrice.classList.add("product__price");

            let articleTotalPrice = article.price*article.quantity;

            // Le formattage du prix pour les utilisateurs : 
            productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(articleTotalPrice);

            // Le prix total de tous les produits:
            totalPrice = totalPrice + articleTotalPrice;

        });
        totalPriceDiv.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(totalPrice);
    }
});