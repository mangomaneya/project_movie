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
// export const fetchMovies = function (Url) {
//   return fetch(Url, options)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (res) {
//       return res.results;
//     });
// };

//try catch문으로 바꿔본 fetchMovies
export const fetchMovies = async (Url) => {
  try {
    const res = await fetch(Url, options);
    const respones = await res.json();
    return respones.results;
  } catch (error) {
    console.log(`에러가 발생했습니다. 에러내용 :${error}`);
  }
};

//try catch문으로 바꿔본 fetchMovies 2번째
// export const fetchMovies = async (Url) => {
//   try {
//     return await fetch(Url, options)
//     .then((res)=>{
//       return res.json();
//     }).then((res)=>{
//       return res.results;
//     })
//   } catch (error) {
//     console.log(`에러가 발생했습니다. 에러내용 :${error}`);
//   }
// };

// 영화 상세정보 fetch
// export const fetchMovies_detail = function (Url) {
//   return fetch(Url, options)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (res) {
//       return res;
//     });
// };

//try..catch문으로 바꿔본 fetchMovies_detail
export const fetchMovies_detail = async (Url)=>{
  try {
    const response = await fetch(Url,options) 
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(`에러가 발생했습니다. 에러내용 :${error}`);
  }
}

