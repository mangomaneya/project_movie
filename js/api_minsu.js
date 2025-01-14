
export const fetchMovies = async function (url) { //url이라는 매개변수를 받는 fetchMovies라는 함수를 표현 // export로 내보냄
    const options = { //api 호출 키 정보 변수
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzFiZTlmOGVmYzM2YjQ2OWRkYWI2N2FhYjgyZGQ1NiIsIm5iZiI6MTczNjI5OTE2My44NDQsInN1YiI6IjY3N2RkMjliMDQ0YjZjYTY3NjRlNGYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fnslzgWikJk9u6em-d-3k0O-2VENF4OeulMAtHTr-u8"
        },
    };
    //try catch문 : try 블록 내 코드가 먼저 실행되고, 만약 그 안에서 예외가 발생한다면 catch 블록 내 코드가 실행됩니다.
    try {
        const res = await fetch(url,options); //fetch : 네트워크에서 리소스를 취득하는 절차를 시작하고, 응답이 사용 가능해지면 이행하는 프로미스를 반환하는 메서드 
        const { results } = await res.json(); // 가져온 데이터를 json형식으로 가공 -> 구조분해할당!!!!!!으로 result값만 빠르게 추출....
        return results;
    }catch (err){ 
        console.error(`API 호출 에러 발생 - ${err}`);
        return []; // 배열 리터럴; 빈 배열이라도 반환하기 위하여... 
    };
};

