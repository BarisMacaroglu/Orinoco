console.log("Script chargé !");

const mainContainer = document.querySelector(".container-main");
const orderId = document.querySelector(".order-id");
const totalPrice = document.querySelector(".total-price");

const orderIdFromLS = localStorage.getItem("orderId");
const totalPriceFromLS = localStorage.getItem("total");

displayOrderInfos();

function displayOrderInfos() {
    if(orderIdFromLS === null || totalPriceFromLS === null) {
        mainContainer.innerHTML = `<p>La page que vous cherchez n'a pas été trouvée. <br><br> <a href="index.html">Retourner à la page d'accueil Orinoco </a></p>`;
        mainContainer.style.padding = "25vh 0";
        mainContainer.style.fontSize = "25px";
        mainContainer.style.textAlign = "center";
    }
    else {
        orderId.innerHTML = orderIdFromLS;
        totalPrice.innerHTML = totalPriceFromLS;
        localStorage.clear();
    }
}