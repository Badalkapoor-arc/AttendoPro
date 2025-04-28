
// ARDUINO INTEGRATION FOR FINGERPRINT CHECK (Check.js)

let checkPort, checkReader, checkWriter;
const checkEncoder = new TextEncoder();
const checkDecoder = new TextDecoder();

// Connect to Arduino manually
async function connectArduinoForCheck() {
    try {
        checkPort = await navigator.serial.requestPort();
        await checkPort.open({ baudRate: 9600 });
        checkWriter = checkPort.writable.getWriter();
        checkReader = checkPort.readable.getReader();
        alert("Connected to Arduino for Checking Fingerprint!");
    } catch (error) {
        alert("Failed to connect: " + error);
    }
}

// Send "CHECK" and read the fingerprint ID
const textDecoder = new TextDecoder();

async function checkFingerprint() {
  await checkWriter.write(checkEncoder.encode("CHECK\n"));
  const { value, done } = await checkReader.read();

  if (value) {
    const responseText = textDecoder.decode(value);
    console.log("Response:", responseText);

    const id = extractId(responseText);
    if (id !== null) {
      console.log("Extracted ID:", id);
      getStudent(id); // Call getStudent with the extracted ID
      // Do something with ID (like mark attendance)
    } else {
      console.log("No ID found.");
    }
  }
}

function extractId(response) {
  const match = response.match(/(?:FOUND_ID|EXISTING_ID):f(\d+)/);
  if (match) {
    return Number(match[1]);
  } else {
    return null;
  }
}

// Attach button listeners
const connectCheckButton = document.querySelector("#connectArduinoInfo");
connectCheckButton.addEventListener("click", connectArduinoForCheck);

const checkButton = document.querySelector("#checkFingerprintButton");
checkButton.addEventListener("click", checkFingerprint);

//main code 
let sec=0;
let min=0;
let secinner= document.querySelector(".sec");
let mininner= document.querySelector(".min");
let newinfoBar = document.querySelector("#container");
let timerFun=()=>{
    if(sec===59){
        sec=0;
        min++;
        mininner.innerText=min;
    }else{
        sec++;
        secinner.innerText=sec;
    }
}
setInterval(()=>{
    if(min===10){
        sec=0;
        secinner.innerText=sec;
        return;
    }else{
        timerFun();
    }
},1000);
const addStudent=(name,rollno,branch,semester,fingerprintIdInfo,attendence)=>{
    localStorage.setItem(fingerprintIdInfo,JSON.stringify({name:name, rollno: rollno,branch:branch,semester: semester,attendance:attendence}));
}
const getStudent=(fingerprintIdInfo)=>{
    let newDiv = document.createElement("div");
    let student =localStorage.getItem(fingerprintIdInfo);
    if(student==null){
        return;
    }else{
        student = JSON.parse(student);
    }
    NEWattendence = student.attendance;
    NEWattendence = NEWattendence + 1;
    addStudent(student.name,student.rollno,student.branch,student.semester,fingerprintIdInfo,NEWattendence); // Update attendance in local storage
    newinfoBar.append(newDiv);
    newDiv.id = `student-${fingerprintIdInfo}`;
    let Addinfo = document.querySelector(`#student-${fingerprintIdInfo}`);
    newDiv.className = "infoarea";
    Addinfo.innerHTML = `
    <div class="container">
        <span>Name: ${student.name}</span>
        <span>Roll NO.: ${student.rollno}</span>
        <span>Branch: ${student.branch}</span>
    </div>
    <div class="container1">
        <span>Semester: ${student.semester}</span>
        <span>Attendance: ${student.attendance}</span>
    </div>
`;
}