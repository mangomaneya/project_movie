import { makeMovieCard, movieContainer,bookmarkMovieCard } from "./ui.js";
import { movieDetailUrl, movieUrl, input_search } from "./script.js";
import { fetchMovies, fetchMovies_detail } from "./api.js";

const movieStorage = window.localStorage;
const bookmarkAddBtn = document.querySelector(".bookmark_detail");
export const btn_bookmark = document.querySelector(".bookmark");
const secretBtn = document.querySelector("#secret_btn");

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
  if (!btn_bookmark.classList.contains("close_bookmark")) {
    makeBookmarkArr(movieStorage);
    btn_bookmark.classList.add("close_bookmark");
    input_search.value = null;
  } else {
    movieContainer.innerHTML = "";
    btn_bookmark.classList.remove("close_bookmark");
    fetchMovies(movieUrl).then((res) => {
      makeMovieCard(res);
    });
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
  arr.forEach(function (el) {
    let Url = movieDetailUrl + `${el}?language=ko-KR`;
    // console.log(Url);
    fetchMovies_detail(Url).then(function (result) {
    //   console.log(result);
      bookmarkMovieCard(result);
    });
  });
};
// 스토리지에 있는 키 값을 가진 영화들을 api에서 호출
// ㄴ 스토리지의 키값을 배열로 만들고... 그 배열로 api를 매번 호출....
// 호출한 데이터를 카드로 만들어 목록에 뿌려주기...

//북마크 저장 여부 판단
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

//북마크 지우기 비밀버튼
secretBtn.addEventListener("click", function () {
  alert(`북마크 지우기 완료!`);
  clearBookmark();
  location.reload();
});
