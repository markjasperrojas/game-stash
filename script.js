class Game {
  constructor(title, developer, price, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.developer = developer;
    this.price = price;
    this.status = status;
  }

  setStatus() {
    this.status = this.status === "Played" ? "Not Played" : "Played";
  }
}

function addGameToCollection(title, developer, price, status) {
  myCollection.push(new Game(title, developer, price, status));
}

function displayGames() {
  gamesContainer.innerHTML = "";

  myCollection.forEach((game) => {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const developer = document.createElement("p");
    const price = document.createElement("p");
    const statusBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    card.dataset.id = game.id;
    card.classList.add("card");

    title.textContent = game.title;
    developer.textContent = game.developer;
    price.textContent = "₱" + game.price;

    if (game.status === "Played") {
      statusBtn.classList.add("played");
    } else {
      statusBtn.classList.add("not-played");
    }

    statusBtn.textContent = game.status;
    deleteBtn.textContent = "Delete";

    statusBtn.addEventListener("click", () => {
      game.setStatus();
      statusBtn.textContent = game.status;
      if (game.status === "Played") {
        statusBtn.classList.remove("not-played");
        statusBtn.classList.add("played");
      } else {
        statusBtn.classList.remove("played");
        statusBtn.classList.add("not-played");
      }
    });

    deleteBtn.addEventListener("click", () => {
      myCollection = myCollection.filter((item) => item.id !== game.id);
      displayGames();
    });

    gamesContainer.appendChild(card);
    card.appendChild(title);
    card.appendChild(developer);
    card.appendChild(price);
    card.appendChild(statusBtn);
    card.appendChild(deleteBtn);
  });
}

function clearCustomValidity(input) {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.setCustomValidity("");
    }
  });
}

let myCollection = [];
const gamesContainer = document.querySelector(".games-div");

// Form & Dialog
const dialog = document.getElementById("game-dialog");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const form = document.getElementById("form");

const title = document.getElementById("title");
const developer = document.getElementById("developer");
const price = document.getElementById("price");
const status = document.getElementById("status");

clearCustomValidity(title);
clearCustomValidity(developer);
clearCustomValidity(price);

// Default games
myCollection.push(new Game("Terraria", "Re-Logic", 335, "Played"));
myCollection.push(
  new Game("Assassin's Creed Unity", "Ubisoft", 1100, "Played"),
);
myCollection.push(
  new Game("Monster Hunter Wilds", "Capcom", 3490, "Not Played"),
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

  if (title.value.trim() === "") {
    title.setCustomValidity("Please enter the game title.");
    title.reportValidity();
    return;
  }

  if (developer.value.trim() === "") {
    developer.setCustomValidity("Please enter the game developer.");
    developer.reportValidity();
    return;
  }

  if (price.value.trim() === "") {
    price.setCustomValidity("Please enter the game price.");
    price.reportValidity();
    return;
  }

  addGameToCollection(title.value, developer.value, price.value, status.value);

  document.getElementById("title").value = "";
  document.getElementById("developer").value = "";
  document.getElementById("price").value = "";
  document.getElementById("status").value = "Played";

  displayGames();

  dialog.close();
});
