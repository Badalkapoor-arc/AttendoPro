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
let fingerprintID = fingerprintIdAdd; // Replace with the actual fingerprint ID you want to use
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
//Add.js
// --- Arduino connection for Add (Enrolling fingerprint) ---

let addPort, addReader, addWriter;
const addEncoder = new TextEncoder();
const addDecoder = new TextDecoder();
let fingerprintIdAdd = ""; // Store enrolled fingerprint ID

// Connect to Arduino manually
async function connectArduinoForAdd() {
    try {
        addPort = await navigator.serial.requestPort();
        await addPort.open({ baudRate: 9600 });
        addWriter = addPort.writable.getWriter();
        addReader = addPort.readable.getReader();
        alert("Connected to Arduino for Adding Fingerprint!");
    } catch (error) {
        alert("Failed to connect: " + error);
    }
}

// Send "ENROLL" and read enrolled fingerprint ID automatically
async function enrollFingerprint() {
    if (!addPort || !addWriter) {
        alert("Arduino not connected!");
        return;
    }

    await addWriter.write(addEncoder.encode("ENROLL\n")); // Send ENROLL command

    const { value } = await addReader.read(); // Read response
    const response = addDecoder.decode(value).trim();
    console.log("Arduino Response (Enroll):", response);

    if (response.startsWith("f")) {
        fingerprintIdAdd = response; // Save fingerprint ID
        alert("Fingerprint Enrolled with ID: " + fingerprintIdAdd);
    } else {
        alert("Enrollment Failed!");
    }
}

// Attach button listeners
const connectAddButton = document.querySelector("#connectArduinoAdd");
connectAddButton.addEventListener("click", async () => {
    await connectArduinoForAdd();
});

const enrollButton = document.querySelector("#enrollFingerprintButton");
enrollButton.addEventListener("click", async () => {
    await enrollFingerprint();
});