const inputHolder = document.querySelector(".input-holder");
inputHolder.addEventListener("click", openFunc);

const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", closeFunc);

const searchButton = document.querySelector(".search-icon");
searchButton.addEventListener("click", searchFunc);

const searchWrapper = document.querySelector(".search-wrapper");

const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keyup", searchInputFunc);

const searchContainer = document.querySelector(".search");

function openFunc(event) {
  const searchWrapper = document.querySelector(".search-wrapper");
  searchWrapper.classList.add("active");
  // searchContainer.style.marginRight = "250px";
  searchContainer.style.marginRight = "330px";
  searchInput.focus();
}

function closeFunc(event) {
  searchWrapper.classList.remove("active");
  searchInput.value = "";
  searchContainer.style = "";
}

function searchFunc() {
  if (searchWrapper.classList.contains("active")) {
    const searchQuery = searchInput.value;
    apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=e487d573948874cb333b763e6c460e12`;
    getData(apiUrl);
  }
}

function searchInputFunc(event) {
  if (event.keyCode === 13) {
    searchFunc();
  }
}

let apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e487d573948874cb333b763e6c460e12";

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  apiDataOperator(data);
}

getData(apiUrl);

const filmBlock = document.querySelector(".films-block-content");

function apiDataOperator(data) {
  if (filmBlock.innerHTML == "") {
    console.log("empty");
    createFilmCard(data);
  } else {
    console.log("full");
    filmBlock.innerHTML = "";
    createFilmCard(data);
  }
}

function createFilmCard(data) {
  let counter = 0;
  for (let item in data.results) {
    const div = document.createElement("div");
    div.classList.add("film-card");
    div.addEventListener("click", openCardDescription);
    filmBlock.append(div);

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${data.results[counter].poster_path}`;
    img.alt = "film poster";
    img.classList.add("film-card-image");

    const h2 = document.createElement("h2");
    h2.textContent = data.results[counter].original_title;

    const description = document.createElement("div");
    description.classList.add("film-card-description");

    const p = document.createElement("p");
    p.textContent = data.results[counter].overview;

    const rate = document.createElement("span");
    rate.classList.add("film-rate");
    rate.textContent = data.results[counter].vote_average;

    const cross = document.createElement("img");
    cross.src = "assets/svg/cross.svg";
    cross.alt = "close";
    cross.classList.add("film-card-cross");
    cross.addEventListener("click", closeCardDescription);

    div.prepend(description);
    description.append(p);
    description.prepend(cross);
    div.prepend(rate);
    div.append(img);
    div.append(h2);

    counter++;
  }
}

function openCardDescription(event) {
  console.log("open");
  event.currentTarget.querySelector(".film-card-description").style.display =
    "block";
}

let currentDescription;
function closeCardDescription(event) {
  event.stopPropagation();

  event.target.parentElement.classList.toggle("description-remove");
  currentDescription = event.target.parentElement;
  setTimeout(descriptionRemoving, 400);
}

function descriptionRemoving() {
  currentDescription.classList.toggle("description-remove");
  currentDescription.style.display = "none";
}
