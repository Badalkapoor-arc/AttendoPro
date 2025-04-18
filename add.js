//update and add the value of fingerprintId in local storage
const addStudent=(name,rollno,branch,semester,fingerprintId,attendence)=>{
    localStorage.setItem(fingerprintId,JSON.stringify({name:name, rollno: rollno,branch:branch,semester: semester,attendance:attendence}));
}
let textName;
let textRollNo;
let selectBranch;
let selectSemester;
let passkey;
let textAtten;
let subBtn = document.querySelector(".button");
let fingerprintID = "f1"; // Replace with the actual fingerprint ID you want to use
let Student = JSON.parse(localStorage.getItem(fingerprintID));
let prAtten = Student.attendance;
const newdetails=()=>{
    if(passkey.value==="T20P16C3"){
        textName = document.querySelector(".textarea");
        textAtten = document.querySelector("#atten");
        textRollNo = document.querySelector("#rollno");
        selectBranch = document.querySelector(".branch");
        selectSemester = document.querySelector(".semester");
        if(textAtten.value===""){
            addStudent(textName.value,textRollNo.value,selectBranch.value,selectSemester.value,fingerprintID,prAtten);//ADD FINGERPRINT ID HERE
        }else{
            addStudent(textName.value,textRollNo.value,selectBranch.value,selectSemester.value,fingerprintID,textAtten.value);//ADD FINGERPRINT ID HERE
        }    
    }
    else{
        alert("Incorrect password or password field is empty");
    }
}
subBtn.addEventListener("click",()=>{
    passkey = document.querySelector("#password");
    newdetails();
});
// // Function to connect to Arduino and get the fingerprint ID
// async function getFingerprintIDFromArduino() {
//     try {
//         // Send instruction to Arduino to take a fingerprint
//         await sendInstructionToArduino("TAKE_FINGERPRINT");

//         // Wait for the fingerprint ID from Arduino
//         const fingerprintId = await waitForDataFromArduino();
//         if (fingerprintId) {
//             console.log("Fingerprint ID received:", fingerprintId);

//             // Store the fingerprint ID in the global variable
//             fingerprintID = fingerprintId;

//             // Process the fingerprint ID (e.g., retrieve or add student details)
//             newdetails();
//         } else {
//             console.error("No fingerprint ID received from Arduino.");
//         }
//     } catch (error) {
//         console.error("Error during fingerprint handling:", error);
//     }
// }