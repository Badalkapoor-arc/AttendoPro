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
//ardunio connect 
// ARDUINO INTEGRATION FOR FINGERPRINT ENROLLMENT
let port, reader, writer;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function connectToArduino() {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    reader = port.readable.getReader();
}

async function sendToArduino(msg) {
    await writer.write(encoder.encode(msg + "\n"));
}

async function readFromArduino() {
    const { value } = await reader.read();
    return decoder.decode(value).trim();
}

// Modify subBtn event listener to connect to Arduino and enroll fingerprint
subBtn.addEventListener("click", async () => {
    passkey = document.querySelector("#password");
    if (passkey.value === "T20P16C3") {
        try {
            await connectToArduino();
            await sendToArduino("ENROLL"); // Ask Arduino to enroll fingerprint
            const returnedID = await readFromArduino();
            if (returnedID && returnedID.startsWith("f")) {
                fingerprintID = returnedID; // Assign Arduino-generated ID
            } else {
                alert("Failed to get fingerprint ID from Arduino");
                return;
            }
        } catch (e) {
            alert("Error communicating with Arduino: " + e);
            return;
        }
    }
});
