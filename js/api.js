// api get메소드 키
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFiZTlmOGVmYzM2YjQ2OWRkYWI2N2FhYjgyZGQ1NiIsIm5iZiI6MTczNjI5OTE2My44NDQsInN1YiI6IjY3N2RkMjliMDQ0YjZjYTY3NjRlNGYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnslzgWikJk9u6em-d-3k0O-2VENF4OeulMAtHTr-u8",
  },
};

// 현재 상영죽인 영화 리스트 fetch
export const fetchMovies = function (Url) {
  return fetch(Url, options)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      return res.results;
    });
};

// 영화 상세정보 fetch
export const fetchMovies_detail = function (Url) {
  return fetch(Url, options)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      // const {title, vote_average, release_date, poster_path,overview } =
      return res;
    });
};
