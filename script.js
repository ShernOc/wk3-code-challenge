// Globals
const BASE_URL = "http://localhost:3000";
const END_POINT = "movies";
const URL = `${BASE_URL}/${END_POINT}`;

// Application state
const state = {
  movieList: [],
};

// Application state keys
const stateKeys = Object.freeze({
  movieList: "movieList",
});

// State functions
function getState(key) {
  return state[key];
}

function setState(key, newValue) {
  state[key] = newValue;
}

// Appliation logic
await getMovieList();
displayFirstMovieDetails();
displayMovieMenu();

// Utility functions
// Functionality to fetch movies from the API
async function fetchMovieList() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Network request was not ok ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Fetch error: ${error}`);
  }
}

async function getMovieList() {
  const movieList = await fetchMovieList();
  setState(stateKeys.movieList, movieList);
}

function displayFirstMovieDetails() {
  const movieDetails = getMovieDetails(1);
  renderFirstMovieDetails(movieDetails);
}

function getMovieDetails(id) {
  const movieList = state[stateKeys.movieList];
  return movieList.find(
    (movie) => Number.parseInt(movie.id) === Number.parseInt(id)
  );
}

function renderFirstMovieDetails(details) {
  updateFirstMovieEl(details);
}

function updateFirstMovieEl(movieDetails) {
  const firstMovieEl = document.querySelector(".card");
  const posterEl = firstMovieEl.querySelector(".card-img-top");
  const titleEl = firstMovieEl.querySelector(".card-title");
  const runtimeEl = firstMovieEl.querySelector(".runtime");
  const showtimeEl = firstMovieEl.querySelector(".showtime");
  const availableTicketsEl = firstMovieEl.querySelector(".available-tickets");

  const { poster, title, runtime, showtime, capacity, tickets_sold } =
    movieDetails;

  posterEl.setAttribute("src", poster);
  titleEl.textContent += ` ${title}`;
  runtimeEl.textContent += ` ${runtime} minutes`;
  showtimeEl.textContent += ` ${showtime}`;
  availableTicketsEl.textContent += ` ${capacity - tickets_sold}`;
}

function displayMovieMenu() {
  const movieList = getState(stateKeys.movieList);

  renderMovieList(movieList);
}

function renderMovieList(movieList) {
  const movieMenuItemElList = createMovieMenuItemElList(movieList);
  renderMovieMenuItems(movieMenuItemElList);
}

function createMovieMenuItemElList(movieList) {
  const movieMenuItemElList = movieList.map((movie) =>
    createMovieMenuItemEl(movie)
  );
  return movieMenuItemElList;
}

function createMovieMenuItemEl(movie) {
  const menuItemEl = document.createElement("li");
  menuItemEl.classList.add("list-group-item");

  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  menuItemEl.appendChild(cardEl);

  const rowEl = document.createElement("div");
  rowEl.classList.add("row", "g-0");
  cardEl.appendChild(rowEl);

  const colEl = document.createElement("div");
  colEl.classList.add("col-2");
  rowEl.appendChild(colEl);

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", movie.poster);
  imgEl.classList.add("img-fluid", "rounded-start");
  imgEl.style.maxHeight = "8rem";
  imgEl.setAttribute("alt", movie.title);
  colEl.appendChild(imgEl);

  const col2El = document.createElement("div");
  col2El.classList.add("col");
  rowEl.appendChild(col2El);

  const cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body");
  col2El.appendChild(cardBodyEl);

  const cardTitleEl = document.createElement("h5");
  cardTitleEl.classList.add("card-title");
  cardTitleEl.textContent = movie.title;
  cardBodyEl.appendChild(cardTitleEl);

  const cardTextEl = document.createElement("p");
  cardTextEl.classList.add("card-text");
  cardBodyEl.appendChild(cardTextEl);

  return menuItemEl;
}

function renderMovieMenuItems(movieMenuItemList) {
  const fragmentEl = document.createDocumentFragment();

  for (const movieMenuItem of movieMenuItemList) {
    fragmentEl.appendChild(movieMenuItem);
  }

  const movieListEl = document.querySelector("#movie-list");
  movieListEl.appendChild(fragmentEl);
}
