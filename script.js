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
  const firstMovieEl = document.querySelector(".movie-details .card");
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
