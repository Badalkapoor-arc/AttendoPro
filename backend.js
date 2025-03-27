let menuBTN = document.querySelector('.menu');
let menuBar = document.querySelector('#menuBar');
menuBTN.addEventListener('click',()=>{
    menuBar.setAttribute("id","menuBar1");
});
let closeBTN = document.querySelector('.closeMenu');
let menuBar1 = document.querySelector('#menuBar1');
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
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAybxF89nrvZjbpDg8TY2VeYBIAJvG-hvQ",
  authDomain: "attendopro-43d2a.firebaseapp.com",
  projectId: "attendopro-43d2a",
  storageBucket: "attendopro-43d2a.firebasestorage.app",
  messagingSenderId: "189917683156",
  appId: "1:189917683156:web:21d6c77c8a95c169630a41",
  measurementId: "G-JJS76P3C5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//api key
//AIzaSyBp4ox3RivUWxQzQMsdymlXvbNixo7mk9Y