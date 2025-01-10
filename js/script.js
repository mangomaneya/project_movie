//api.js에서 함수 import 
import {fetchMovies} from "./api.js";

const options = { //api 호출 키 정보 변수
  method: 'GET',
  headers: {
  accept: 'application/json',
  Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFiZTlmOGVmYzM2YjQ2OWRkYWI2N2FhYjgyZGQ1NiIsIm5iZiI6MTczNjI5OTE2My44NDQsInN1YiI6IjY3N2RkMjliMDQ0YjZjYTY3NjRlNGYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnslzgWikJk9u6em-d-3k0O-2VENF4OeulMAtHTr-u8"
  },
};

const apiKey = "631be9f8efc36b469ddab67aab82dd56"; // 보안필요
const movie_url = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1"; // 상영작 데이터 링크
const img_base_url ="https://image.tmdb.org/t/p/original" // 이미지 소스 url 공통


// DOM 관련 선언영역
const container_m = document.querySelector("#cont_movie");
// let movies = document.querySelectorAll(".movies")
let movie_poster = document.querySelectorAll(".movie_poster");
const btn_search = document.querySelector("#btn_search");
const input_search = document.querySelector("#input_search");
let query = input_search.value.toLowerCase();
let movieData = [];

fetchMovies(movie_url).then(function (movies) {
  makeMovieCard(movies);
});

const makeMovieCard = function(movies){
  movieData = movies;
  container_m.innerHTML = movieData.map(function(movie) {
    `<div class="movies" data-name =${movie.id}>
          <img alt="movie poster" class="movie_poster" src="${img_base_url}${movies.poster_path}">
          <h2 class="movie_title">${movie.title}</h2>
          <p class="movie_aver">⭐️ ${movie.vote_average}</p>
      </div>`
  }).join('');
};

// 카드 ui뿌리기 
// fetch(movie_url, options)
//   .then(res => res.json()) 
//   .then(res => {
//     const movies = res.results;
//     container_m.innerHTML = movies.map((movie) => 
//       `<div class="movies">
//           <img alt="movie poster" class="movie_poster" src="${img_base_url}${movie.poster_path}">
//           <h2 class="movie_title">${movie.title}</h2>
//           <p class="movie_aver">⭐️ ${movie.vote_average}</p>
//       </div>`
//     ).join('');
//   })
//   .catch(err => console.error(err));

// 검색 버튼 이벤트
btn_search.addEventListener("click", () => {
  alert(query);

});
