let menuBTN = document.querySelector('.menu');
let menuBar = document.querySelector('#menuBar');
let submitBTN = document.querySelector('#btn');
let closeBTN = document.querySelector('.closeMenu');
let menuBar1 = document.querySelector('#menuBar1');
menuBTN.addEventListener('click',()=>{
    menuBar.setAttribute("id","menuBar1");
});
closeBTN.addEventListener('click',()=>{
    if(menuBar1==null){
        menuBar1=menuBar;
        menuBar1.setAttribute("id","menuBar");
    }else{
        menuBar1.setAttribute("id","menuBar");
    }
});
document.querySelector('.home').addEventListener('click',()=>{
    window.location.href = "index.html";
});
document.querySelector('.Accessor').addEventListener('click',()=>{
    window.location.href = "Authenticator.html";
});
document.querySelector('.student').addEventListener('click',()=>{
    window.location.href = "student.html";
});
document.querySelector('.about').addEventListener('click',()=>{
    window.location.href = "about.html";
});
submitBTN.addEventListener("click",()=>{
    window.location.href = "infoCheck.html";
});