const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer 631be9f8efc36b469ddab67aab82dd56"
  }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json()) // json형식으로 응답 변환
  .then(res => console.log(res)) // 데이터를 콘솔에 출력
  .catch(err => console.error(err)); // 에러 처리

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "631be9f8efc36b469ddab67aab82dd56";
let Endpoint = "movie/now_playing";

const m_url_nowPlaying = `${baseUrl}${Endpoint}?${apiKey}`;

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json()) 
  .then(res => {
    const movies = res.results;
    m_container.innerHTML = movies.map((movie) => 
      `<div>
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="size-500">
        <p>${movie.overview}</p>
      </div>`
    ).join('');
    console.log(movies);
  })
  .catch(err => console.error(err));

const m_container = document.querySelector("#movies");
