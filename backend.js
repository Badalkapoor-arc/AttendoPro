let menuBTN = document.querySelector('.menu');
let menuBar = document.querySelector('#menuBar');
let closeBTN = document.querySelector('.closeMenu');
let menuBar1 = document.querySelector('#menuBar1');
let password = document.querySelector(".password");
let submitBTN = document.querySelector('#btn');
let form = document.querySelector("form");
let key = "T20P16C3";
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
submitBTN.addEventListener("click", () => {
    if (password.value.toString() === key.toString()) {
        console.log(password.value.toString());
        form.method="form";
        form.action="infoCheck.html";
    } else {
        alert("Incorrect password or password field is empty");
    }
});
console.log(key.toString());
