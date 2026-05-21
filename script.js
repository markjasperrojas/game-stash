const myCollection = [];
const displayData = document.getElementById("display-data");

myCollection.push(
  new Game("Assassin's Creed Unity", "Ubisoft", 1100, "Played"),
);
myCollection.push(new Game("Terraria", "Re-Logic", 335, "Played"));
myCollection.push(
  new Game("Monster Hunter Wilds", "Capcom", 3490, "Not Played"),
);

myCollection.forEach((game) => {
  const tableRow = document.createElement("tr");
  const title = document.createElement("td");
  const developer = document.createElement("td");
  const price = document.createElement("td");
  const status = document.createElement("td");

  title.textContent = game.title;
  developer.textContent = game.developer;
  price.textContent = game.price;
  status.textContent = game.status;

  displayData.appendChild(tableRow);
  tableRow.appendChild(title);
  tableRow.appendChild(developer);
  tableRow.appendChild(price);
  tableRow.appendChild(status);
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
  this.info = function () {
    return `The ${this.title} by ${this.developer}, ${this.price}, ${this.status}`;
  };
}

function addGameToCollection() {}
