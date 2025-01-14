//api.js module가져오기
import { options, fetchMovies, fetchMovies_detail } from "./api.js";
import { makeMovieCard, makeMovieDetail, movieContainer } from "./ui.js";

//api 관련 변수 선언
let movieList = []; // 현재 상영중인 영화 목록 배열
const movieUrl =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";
const movieUrlSearch = "https://api.themoviedb.org/3/search/movie";
const movieDetailUrl = "https://api.themoviedb.org/3/movie/";
// ?query=${query}&include_adult=false&language=ko-KR&page=1
// DOM 관련 변수 선언
const btn_search = document.querySelector("#btn_search");
const input_search = document.querySelector("#input_search");
const modal = document.querySelector(".modal");
const modal_close = document.querySelector(".detail_close_btn");
const btn_bookmark = document.querySelector(".bookmark");
const btn_like = document.querySelector(".like");
//영화 상세창 관련 DOM가져오기

//가져온 영화목록을 카드 ui로 만들기
fetchMovies(movieUrl).then(function (result) {
  // console.log(result);
  makeMovieCard(result);
});

// 버튼 클릭이벤트 - 검색실행
btn_search.addEventListener("click", function () {
  let query = input_search.value.toLowerCase();
  searchMovie(query);
});

// 검색창 엔터 이벤트 - 검색실행
function enterSearch(event) {
  let query = input_search.value.toLowerCase();
  const code = event.code;
  if (code === "Enter") {
    searchMovie(query);
  }
}
input_search.addEventListener("keyup", enterSearch);

//query가 포함된 검색결과를 카드에 반영하는 기능
const searchMovie = function (query) {
  let searchUrl =
    query.length > 0
      ? movieUrlSearch +
        `?query=${query}&include_adult=false&language=ko-KR&page=1`
      : movieUrl;
  movieContainer.innerHTML = "";
  fetchMovies(searchUrl).then(function (result) {
    makeMovieCard(result);
  });
};

//data-id 속성을 가지고 영화정보를 가져와서 모달에 반영하기
const movieDetail = function (id) {
  toggleModal();
  let idUrl = `${movieDetailUrl}${id}?language=ko-KR`;
  fetchMovies_detail(idUrl).then(function (result) {
    // console.log(idUrl);
    makeMovieDetail(result);
  });
};

// 영화 선택 클릭 이벤트 - dataid가져오기
movieContainer.addEventListener("click", function (e) {
  let dataId = "";
  if (e.target.closest(".movies") !== null) {
    dataId = e.target.closest(".movies").getAttribute("data-id");
  } else {
    return;
  }
  // console.log(dataId);
  movieDetail(dataId);
});

// 모달 토글 기능
const toggleModal = function () {
  modal.classList.toggle("hide");
};
// 모달 닫기버튼 누르면 닫히기
modal_close.addEventListener("click", toggleModal);
// 모달 바깥부분 누르면 닫히기
window.addEventListener("click", function (e) {
  e.target === modal ? toggleModal() : false;
});

// 좋아요 표시 (전체동기화문제;;)
btn_like.addEventListener("click", function () {
  let i = document.querySelector("#ilike");
  // console.log(i.className)
  if (i.classList.contains("icon-heart-empty")) {
    i.classList.remove("icon-heart-empty");
    i.classList.add("icon-heart");
  } else if (i.classList.contains("icon-heart")) {
    i.classList.remove("icon-heart");
    i.classList.add("icon-heart-empty");
  }
});

const movieStorage = window.localStorage;
// movieStorage.setItem("Id", "558449")
// const cat = movieStorage.getItem("Id");
// console.log(movieStorage);
// console.log(cat);

const bookmarkAddBtn = document.querySelector(".bookmark_detail");

const addBookmark = function(id){
  movieStorage.setItem(id,id);
  console.log(movieStorage);
}
const delBookmark = function(id){
  movieStorage.removeItem(id);
}
const clearBookmark = function(){
  movieStorage.clear();
}

bookmarkAddBtn.addEventListener("click", function(e){
  let dataId = e.target.closest(".modal_movie_detail").getAttribute("data-id");
  //현재 얻은 데이터 아이디가 스토리지에 있으면(find?)
  // class list에 saved를 추가
  // saved가 이미 리스트에 포함된 상태이면
  // delbookmark를 실행하고, saved를 없애기 
  addBookmark(dataId);
});