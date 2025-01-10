// api 관련 선언영역
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // Authorization: "Bearer 631be9f8efc36b469ddab67aab82dd56"
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFiZTlmOGVmYzM2YjQ2OWRkYWI2N2FhYjgyZGQ1NiIsIm5iZiI6MTczNjI5OTE2My44NDQsInN1YiI6IjY3N2RkMjliMDQ0YjZjYTY3NjRlNGYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnslzgWikJk9u6em-d-3k0O-2VENF4OeulMAtHTr-u8"
  }
};
const apiKey = "631be9f8efc36b469ddab67aab82dd56"; // 보안필요
const base_url = "https://api.themoviedb.org/3"; //tmdb 기본 url
const img_base_url ="https://image.tmdb.org/t/p/w500" // tmdb 이미지 소스 url
const file_size = "original"; // 포스터 및 로고 이미지 부를 때 사이즈 설정
// const file_type = "original"; // 로고 이미지 타입용이었는데 사이즈랑 중복되서 주석처리 
let img_file_path = ""; // 이미지 파일 경로
let logo_path = ""; // 로고파일 경로(넷플릭스 등) 

// DOM 관련 선언영역
const container_m = document.querySelector("#cont_movie");
let movies = document.querySelectorAll(".movies")
let movie_poster = document.querySelectorAll(".movie_poster");
const btn_search = document.querySelector("#btn_search");
const input_search = document.querySelector("#input_search");
let query = input_search.value.toLowerCase();

// API데이터 읽어오기 테스트
// fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//   .then(res => res.json()) // json형식으로 응답 변환
//   .then(res => console.log(res)) // 데이터를 콘솔에 출력
//   .catch(err => console.error(err)); // 에러 처리

//이건 동기로 처리된거... 
fetch(`${base_url}/movie/now_playing?language=ko-KR&page=1`, options)
  .then(res => res.json()) 
  .then(res => {
    console.log(res);
    const movies = res.results;
    container_m.innerHTML = movies.map((movie) => 
      `<div class="movies">
          <img alt="movie poster" class="movie_poster" src="${img_base_url}${movie.poster_path}">
          <h2 class="movie_title">${movie.title}</h2>
          <p class="movie_aver">⭐️ ${movie.vote_average}</p>
      </div>`
    ).join('');
  })
  .catch(err => console.error(err));

// 검색 버튼 이벤트
btn_search.addEventListener("click", () => {
  alert(query);
  // fetch(`${base_url}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,options)
  // .then(res => res.json())
  // .then(res => {
  //   const result = res["results"];
  //   console.log(result);
  // })
  // .catch(err => console.error(err))
});
