const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector('#email');
const errorMsg = document.querySelector(".form__error");

class Form {

    constructor() {
    }
    
    // Renvoie "true" si le formulaire est validé
    static validateForm() {

        // trim() pour enlever les espaces vides
        const firstNameValue = firstName.value.trim();
        const lastNameValue = lastName.value.trim();
        const addressValue = address.value.trim();
        const cityValue = city.value.trim();
        const emailValue = email.value.trim();
    
        if(!firstNameValue || !lastNameValue || !addressValue || !cityValue || !emailValue ) {
            errorMsg.innerHTML = "Veuillez saisir tous les champs !";
        } else if(!isEmail(emailValue)) {
            errorMsg.innerHTML = "Adresse e-mail invalide";
        } else if(!isText(firstNameValue)) {
            errorMsg.innerHTML = "Le prénom ne doit contenir que des lettres";
        } else if(!isText(lastNameValue)) {
            errorMsg.innerHTML = "Le nom ne doit contenir que des lettres";
        } else if(!isText(cityValue)) {
            errorMsg.innerHTML = "La ville ne doit contenir que des lettres";
        } 
        else {
            console.log("Le formulaire est validé");
            return true;
        }
    }

    // Crée et renvoie un objet de contact
    static createContactObj() {

        const contactObj = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            address: address.value.trim(),
            city: city.value.trim(),
            email: email.value.trim(),
        };
        
        return contactObj;
    }

}

// Renvoie "true" si l'argument passé en paramètre est une adresse e-mail valide
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Renvoie "true" si l'argument passé en paramètre ne contient que des lettres
function isText(arg) {
    let letters = /^[A-Za-z]+$/;
    // let letters = /([A-Za-z])\w+-/;
    if(arg.match(letters)) {
        return true;
    }
}