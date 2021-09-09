console.log("Script chargé !");

bringAllTeddies();
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