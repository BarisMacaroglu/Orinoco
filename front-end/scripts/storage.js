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

}