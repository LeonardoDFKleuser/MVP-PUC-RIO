/*
  --------------------------------------------------------------------------------------
  Função para obter a chave de api do serviço externo setada em um arquivo local
  --------------------------------------------------------------------------------------
*/

var RAWG_KEY = sessionStorage.getItem("RAWG_KEY");

() => {
  if (RAWG_KEY) {
    return;
  }
  fetch("http://127.0.0.1:8080/rawgkey.txt", {
    method: "get",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      RAWG_KEY = data;
      sessionStorage.setItem("RAWG_KEY", data);
    })
}



const searchGame = () => {
  let name = document.getElementById("searchGameName").value;
  let tableBody = document.getElementById("myGamesBody");
  tableBody.innerHTML = null;

  fetch(`https://api.rawg.io/api/games?page=1&page_size=10&search=${name}&key=${RAWG_KEY}`, {
    method: "get",
  })
    .then((response) => {
      if (response.status != 200) {
        throw response.body.message;
      }
      return response.json();
    })
    .then((data) => {
      for (let result of data.results) {

        let row = document.createElement("tr");

        let gameThumbNailCell = document.createElement("td");
        let thumbNail = document.createElement("img");
        thumbNail.setAttribute("height", 120);
        thumbNail.setAttribute("width", 120);
        thumbNail.setAttribute("src", result.background_image);
        gameThumbNailCell.appendChild(thumbNail);

        let gameNameCell = document.createElement("td");
        gameNameCell.innerText = result.name;

        let gamePlatformCell = document.createElement("td");
        gamePlatformCell.innerText = result.platforms.reduce((acc = ", ", cur) => cur.name + acc, "");

        let gameStoreCell = document.createElement("td");
        gameStoreCell.innerText = result.stores.reduce((acc = ", ", cur) => cur.name + acc, "");

        row.appendChild(gameThumbNailCell);
        row.appendChild(gameNameCell);
        row.appendChild(gamePlatformCell);
        row.appendChild(gameStoreCell);

        tableBody.appendChild(row);
      }
    })
}