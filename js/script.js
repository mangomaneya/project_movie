// api 관련 선언영역
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer 631be9f8efc36b469ddab67aab82dd56"
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
const m_container = document.querySelector("#movies");

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json()) // json형식으로 응답 변환
  .then(res => console.log(res)) // 데이터를 콘솔에 출력
  .catch(err => console.error(err)); // 에러 처리

// fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//   .then(res => res.json()) 
//   .then(res => {
//     const movies = res.results;
//     m_container.innerHTML = movies.map((movie) => 
//       `<div>
//         <h2>${movie.title}</h2>
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="size-500">
//         <p>${movie.overview}</p>
//       </div>`
//     ).join('');
//     console.log(movies);
//   })
//   .catch(err => console.error(err));

// 
