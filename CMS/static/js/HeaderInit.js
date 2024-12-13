const home = document.getElementById("home");
const modules = document.getElementById('modules');
const profile = document.getElementById('profile');

function nav_init(){
    home.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/homepage/";
    })
    modules.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/mymodules/";
    })
    profile.addEventListener('click', ()=>{
        window.location.href = window.location.origin + "/profile/";
    })
}

window.addEventListener("load", nav_init, false)