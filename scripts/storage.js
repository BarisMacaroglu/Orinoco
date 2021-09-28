class Storage {

    constructor() {
    }

    getItemsFromLS() {

        let itemsArray;

        // Si un Array de 'itemsArray' n'existe pas sur Local Storage, on l'initialise :
        if (localStorage.getItem("itemsArray") === null) {
            itemsArray = [];
        }

        // Sinon, on récupère l'Array 'itemsArray' qui existe déjà sur Local Storage
        else {
            // localStorage.getItem("itemsArray") -> est un String, il faut que l'on le transforme à l'Array :
            itemsArray = JSON.parse(localStorage.getItem("itemsArray"));
        }

        return itemsArray;
        
    }

    getItemQty() {
        // Pour afficher le nombre de produit dans le panier à côté de l'icône de panier :
        let itemQty = this.getItemsFromLS().length;

        if(itemQty > 0) {
            const basketQteInf = document.createElement("p");
            document.querySelector(".nav__basket").appendChild(basketQteInf);
            basketQteInf.classList.add("numberProduct");
            basketQteInf.innerHTML = itemQty;
          }
        return itemQty;
    }

    deleteItem(e) {
        
        const productID = e.target.parentElement.parentElement.parentElement.parentElement.id;  // L'ID du produit
        
        const productColor = e.target.parentElement.parentElement.children[1].textContent;  // La couleur du produit

        let articlesArray = JSON.parse(localStorage.getItem("itemsArray"));

        articlesArray.forEach(function(item, index) {
            if((item._id === productID) && (item.color === productColor)) {
                articlesArray.splice(index, 1);
            }
        });
    
        localStorage.setItem("itemsArray", JSON.stringify(articlesArray));
    
        setTimeout(location.reload(true));  
    }

}