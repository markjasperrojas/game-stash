let myCollection = [];
const displayData = document.getElementById("display-data");

// Form & Dialog
const dialog = document.getElementById("game-dialog");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const form = document.getElementById("form");

// Default games
myCollection.push(
  new Game("Monster Hunter Wilds", "Capcom", 3490, "Not Played"),
);
myCollection.push(new Game("Terraria", "Re-Logic", 335, "Played"));
myCollection.push(
  new Game("Assassin's Creed Unity", "Ubisoft", 1100, "Played"),
);

// Default display
displayGames();

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let developer = document.getElementById("developer").value;
  let price = document.getElementById("price").value;
  let status = document.getElementById("status").value;

  addGameToCollection(title, developer, price, status);

  document.getElementById("title").value = "";
  document.getElementById("developer").value = "";
  document.getElementById("price").value = "";
  document.getElementById("status").value = "Played";

  displayGames();

  dialog.close();
});

function Game(title, developer, price, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.developer = developer;
  this.price = price;
  this.status = status;
}

Game.prototype.setStatus = function () {
  this.status = this.status === "Played" ? "Not Played" : "Played";
};

function addGameToCollection(title, developer, price, status) {
  myCollection.push(new Game(title, developer, price, status));
}

function displayGames() {
  displayData.innerHTML = "";

  myCollection.forEach((game) => {
    const tableRow = document.createElement("tr");
    const titleTd = document.createElement("td");
    const developerTd = document.createElement("td");
    const priceTd = document.createElement("td");
    const statusBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    tableRow.dataset.id = game.id;

    titleTd.textContent = game.title;
    developerTd.textContent = game.developer;
    priceTd.textContent = "₱" + game.price;
    statusBtn.textContent = game.status;
    deleteBtn.textContent = "Delete";

    statusBtn.addEventListener("click", () => {
      game.setStatus();
      statusBtn.textContent = game.status;
    });

    deleteBtn.addEventListener("click", () => {
      myCollection = myCollection.filter((item) => item.id !== game.id);
      displayGames();
    });

    displayData.appendChild(tableRow);
    tableRow.appendChild(titleTd);
    tableRow.appendChild(developerTd);
    tableRow.appendChild(priceTd);
    tableRow.appendChild(statusBtn);
    tableRow.appendChild(deleteBtn);
  });
}
