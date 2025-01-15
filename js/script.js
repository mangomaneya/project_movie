//api.js module가져오기
import { options, fetchMovies, fetchMovies_detail } from "./api.js";
import { makeMovieCard, makeMovieDetail, movieContainer,bookmarkMovieCard } from "./ui.js";

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

const btn_like = document.querySelector(".like");
const title = document.querySelector("#title");
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
    statusBookmark(id);
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

title.addEventListener("click",function(){
  location.reload();
});

const movieStorage = window.localStorage;
const bookmarkAddBtn = document.querySelector(".bookmark_detail");
const btn_bookmark = document.querySelector(".bookmark");

const addBookmark = function (id) {
  movieStorage.setItem(id, id);
  // console.log(movieStorage);
};
const delBookmark = function (id) {
  movieStorage.removeItem(id);
  // console.log(movieStorage);
};
const clearBookmark = function () {
  movieStorage.clear();
};
//북마크 버튼 클릭이벤트 
btn_bookmark.addEventListener("click", function () {
  if(!btn_bookmark.classList.contains("close_bookmark")){
    makeBookmarkArr(movieStorage);
    btn_bookmark.classList.add("close_bookmark");
  }else{
    movieContainer.innerHTML="";
    btn_bookmark.classList.remove("close_bookmark");
    fetchMovies(movieUrl).then((res)=>{
      makeMovieCard(res);
    })
  }
});

// 영화 스토리지에서 키 값만 배열에 담음 (영화id)
const makeBookmarkArr = function (storage) {
  let bookmarkArr = [];
  for (let i = 0; i < storage.length; i++) {
    bookmarkArr.push(Number(storage.key(i)));
  }
  // console.log(bookmarkArr);
  bookmarkMovie(bookmarkArr);
};
//배열정보를 url에 대입하여 api호출하고 카드 ui만들기 동작
const bookmarkMovie = function (arr) {
  if (arr.length === 0) {
    movieContainer.innerHTML = "<p>북마크된 영화가 없습니다.</p>";
    return;
  }
  movieContainer.innerHTML = "";
  arr.forEach(function(el){
    let Url = movieDetailUrl +`${el}?language=ko-KR`;
    // console.log(Url);
    fetchMovies_detail(Url).then(function (result) {
      // console.log(result);
      bookmarkMovieCard(result);
    })
  });
};
// 스토리지에 있는 키 값을 가진 영화들을 api에서 호출
// ㄴ 스토리지의 키값을 배열로 만들고... 그 배열로 api를 매번 호출....
// 호출한 데이터를 카드로 만들어 목록에 뿌려주기...

export const statusBookmark = function (id) {
  if (movieStorage[id]) {
    // 이미 존재하면
    bookmarkAddBtn.classList.add("saved");
  } else {
    // 존재하지 않으면
    bookmarkAddBtn.classList.remove("saved");
  }
};
bookmarkAddBtn.addEventListener("click", function (e) {
  let dataId = e.target.closest(".modal_movie_detail").getAttribute("data-id");
  // console.log(dataId);

  if (movieStorage[dataId]) {
    // 이미 존재하면
    //북마크와 클래스를 지우고
    delBookmark(dataId);
    bookmarkAddBtn.classList.remove("saved");
  } else {
    // 존재하지 않으면
    // 북마크와 클래스를 추가
    addBookmark(dataId);
    bookmarkAddBtn.classList.add("saved");
  }
});