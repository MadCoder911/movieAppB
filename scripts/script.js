"use strict";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dc932664ec2a138c87133ad2a308b1bd&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=dc932664ec2a138c87133ad2a308b1bd&query="';
const form = document.getElementById("form");
const search = document.querySelector(".search");
const main = document.getElementById("main");

//////////////////////////////
// Get inital movies
const showMovies = function (movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    if (vote_average === 0 || overview === "" || poster_path === null) return;
    let html = `
    <div class="movie">
        <img
          src="${IMG_PATH + poster_path}"
          alt=""
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${checkRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>
    `;
    main.innerHTML += html;
  });
};

//Get request
const getMovies = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
};
getMovies(API_URL);
//Search form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  console.log(searchTerm);
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
const checkRating = function (rating) {
  if (rating <= 3.5) {
    return "red";
  } else if (rating > 3.5 && rating < 7) {
    return "orange";
  } else return "green";
};
