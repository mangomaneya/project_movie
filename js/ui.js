export const movieContainer = document.querySelector("#movie_container");

// 카드 ui
export const makeMovieCard = function (movies) {
  let tempHtml = "";
  movies.forEach(function (m) {
    tempHtml = `<div class="movies" data-id="${m.id}">
          <img alt="movie poster" class="movie_poster" src="https://image.tmdb.org/t/p/original${m.poster_path}">
          <h2 class="movie_title">${m.title}</h2>
          <div class="movie_card_bott">
            <p class="movie_aver"><i class="icon-star"></i> ${m.vote_average}</p>
          </div>
        </div>`;
    movieContainer.innerHTML += tempHtml;
  });
};

// 영화 상세창 ui
export const makeMovieDetail = function (info) {
  const movie_poster_d = document.querySelector(".movie_poster_detail");
  const movie_title_d = document.querySelector(".movie_title_detail");
  const movie_desc_d = document.querySelector(".movie_desc");
  const movie_aver_d = document.querySelector(".movie_aver_detail");
  const movie_date_d = document.querySelector(".movie_date");
  movie_poster_d.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/original${info.poster_path}`
  );
  movie_title_d.textContent = info.title;
  movie_desc_d.textContent = info.overview;
  movie_date_d.textContent = info.release_date;
  movie_aver_d.textContent = info.vote_average;
};
