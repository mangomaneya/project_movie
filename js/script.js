const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFiZTlmOGVmYzM2YjQ2OWRkYWI2N2FhYjgyZGQ1NiIsIm5iZiI6MTczNjI5OTE2My44NDQsInN1YiI6IjY3N2RkMjliMDQ0YjZjYTY3NjRlNGYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnslzgWikJk9u6em-d-3k0O-2VENF4OeulMAtHTr-u8",
  },
};
//api 관련 변수 선언
let movieList = []; // 현재 상영중인 영화 목록 배열
const movieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";
  const movieUrlSearch = "https://api.themoviedb.org/3/search/movie"
  const movieDetailUrl = "https://api.themoviedb.org/3/movie/"
  // ?query=${query}&include_adult=false&language=ko-KR&page=1
const img_base_url ="https://image.tmdb.org/t/p/original";

// DOM 관련 변수 선언
const movieContainer = document.querySelector("#movie_container");
const btn_search = document.querySelector("#btn_search");
const input_search = document.querySelector("#input_search");
const modal = document.querySelector(".modal");
const modal_close = document.querySelector(".detail_close_btn");
const btn_bookmark = document.querySelector(".bookmark");
const moviePoster = document.querySelector(".movie_poster")


// 현재 상영죽인 영화목록을 가져오기
const fetchMovies = function (Url) {
  return fetch(Url, options)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      return res.results;
    });
};

//가져온 영화목록을 카드 ui로 만들기
fetchMovies(movieUrl).then(function (result) {
  console.log(result);
  makeMovieCard(result);
});

// 영화정보로 카드 ui 만들기
const makeMovieCard = function (movies) {
  let tempHtml = "";
  movies.forEach(function (m){
    tempHtml = `<div class="movies" data-id="${m.id}">
          <img alt="movie poster" class="movie_poster" src="${img_base_url}${m.poster_path}">
          <h2 class="movie_title">${m.title}</h2>
          <div class="movie_card_bott">
            <p class="movie_aver">⭐️ ${m.vote_average}</p>
          </div>
        </div>`;
    movieContainer.innerHTML += tempHtml;
  });
};

//query가 포함된 검색결과를 카드에 반영하는 기능
const searchMovie = function(query){
  let searchUrl = query.length > 0 ? movieUrlSearch +`?query=${query}&include_adult=false&language=ko-KR&page=1` : movieUrl;
  movieContainer.innerHTML = "";
  fetchMovies(searchUrl).then(function (result) {
    makeMovieCard(result);
  }); 
}

// 버튼 클릭이벤트 - 검색실행
btn_search.addEventListener("click", function(){
  let query = input_search.value.toLowerCase();
  searchMovie(query);
})
// 검색창 엔터 이벤트 - 검색실행
function enterSearch(event){
  let query = input_search.value.toLowerCase();
  const code = event.code;
  if (code === 'Enter'){
    searchMovie(query);
  }
}

//영화 상세창 관련 DOM가져오기
let movie_poster_d = document.querySelector(".movie_poster_detail");
let movie_title_d = document.querySelector(".movie_tltle_detail");
let movie_desc_d = document.querySelector(".movie_desc");
let movie_aver_d = document.querySelector(".movie_aver_detail");
let movie_date_d = document.querySelector(".movie_date");

//data-id 속성을 가지고 영화정보를 가져와서 모달에 반영하기 
const movieDetail = function(id){
  let idUrl = `${movieDetailUrl}${id}?language=ko-KR`;
  fetchMovies(idUrl).then(function(result){
    console.log(result);
    makeMovieDetail(result);
  });
};

// 영화 선택 클릭 이벤트 
movieContainer.addEventListener("click",function(e){
  let dataId = "";
  if (e.target.closest(".movies") !== null){
    dataId = e.target.closest(".movies").getAttribute("data-id");
  }else{
    return;
  }
  console.log(dataId);  
  movieDetail(dataId);
  toggleModal();
})

const makeMovieDetail = function(info){
  movie_poster_d.textContent = info.title;
  movie_poster_d.setAttribute("src",`${img_base_url}${info.poster_path}`);
  movie_desc_d.textContent = info.overview;
  movie_date_d.textContent =info.release_date;
  movie_aver_d.textContent = info.vote_average;
}

// 모달 토글 기능
const toggleModal = function(){
  modal.classList.toggle("hide");
}
// 닫기버튼 누르면 닫히기
modal_close.addEventListener("click", toggleModal);
//모달 바깥부분 누르면 닫히기
window.addEventListener("click", function(e){
  e.target === modal ? toggleModal() : false;
})
