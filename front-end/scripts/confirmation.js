console.log("Script chargé !");

const orderId = document.querySelector(".order-id");
const totalPrice = document.querySelector(".total-price");

orderId.innerHTML = localStorage.getItem("orderId");
totalPrice.innerHTML = localStorage.getItem("total");

// localStorage.clear();