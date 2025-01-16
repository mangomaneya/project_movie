// form 태그 안에 넣어놓으면 엔터를 치거나, 검색버튼을 누르거나 이벤트를 발생시킨다...
<form> 
    <input></input>
    <button type="submit"></button>
</form>

form.addEventListener('submit', (event)=>{
event.preventDefault(); // 기본기능을 삭제 (form 의 경우 새로고침 )
})
grid-template-column : repeat(auto-fill, minmax(200px, 1fr)); 