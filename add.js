//update and add the value of fingerprintId in local storage
const addStudent=(name,rollno,age,branch,semester,fingerprintId,attendence)=>{
    localStorage.setItem(fingerprintId,JSON.stringify({name:name, rollno: rollno,age:age, semester: semester, branch:branch,atttendence:attendence}));
}
let textName;
let textAge;
let textRollNo;
let selectBranch;
let selectSemester;
let passkey;
let subBtn = document.querySelector(".button");
const newdetails=()=>{
    if(passkey.value==="T20P16C3"){
        textName = document.querySelector(".textarea");
        textAge = document.querySelector("#age");
        textRollNo = document.querySelector("#rollno");
        selectBranch = document.querySelector(".branch");
        selectSemester = document.querySelector(".semester");
        addStudent(textName.value,textRollNo.value,textAge.value,selectBranch.value,selectSemester.value,"f1");//ADD FINGERPRINT ID HERE
    }
    else{
        alert("Incorrect password or password field is empty");
    }
}
subBtn.addEventListener("click",()=>{
    passkey = document.querySelector("#password");
    newdetails();
});