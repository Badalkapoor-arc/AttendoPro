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
// --- Arduino Connection Code for add.js ---

let addPort, addReader, addWriter;
const addEncoder = new TextEncoder();
const addDecoder = new TextDecoder();

async function connectArduinoForAdd() {
    try {
        addPort = await navigator.serial.requestPort();
        await addPort.open({ baudRate: 9600 });
        addWriter = addPort.writable.getWriter();
        addReader = addPort.readable.getReader();
        alert("Connected to Arduino (Add Fingerprint)!");
    } catch (error) {
        alert("Failed to connect for adding fingerprint: " + error);
    }
}

async function sendEnrollToArduino() {
    if (!addPort || !addWriter) {
        alert("Arduino not connected!");
        return;
    }
    await addWriter.write(addEncoder.encode("ENROLL\n"));
}

async function readEnrollResponseFromArduino() {
    if (!addPort || !addReader) {
        alert("Arduino not connected!");
        return;
    }
    const { value } = await addReader.read();
    return addDecoder.decode(value).trim();
}

// Connect button for Add
const connectAddButton = document.querySelector("#connectArduinoAdd");
connectAddButton.addEventListener("click", async () => {
    await connectArduinoForAdd();
});
