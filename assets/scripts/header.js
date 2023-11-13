let logoButton  = document.getElementById('logoBtn');
let searchInputButton = document.getElementById('searchInptBtn');

logoButton.addEventListener('click',function(){
    window.location.replace('/templates/index.html');
});

searchInputButton.addEventListener('click',function(){
    let searchInput = document.getElementById('searchInpt');
    setTimeout(()=>{
        window.location.href = `search-result.html?search=${searchInput.value}`;
    },200)
   
})