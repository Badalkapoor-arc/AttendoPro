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
const addStudent=(name,rollno,branch,semester,fingerprintId,attendence)=>{
    localStorage.setItem(fingerprintId,JSON.stringify({name:name, rollno: rollno,branch:branch,semester: semester,attendance:attendence}));
}
let fingerprintId;
const getStudent=(fingerprintId)=>{
    let newDiv = document.createElement("div");
    let student =localStorage.getItem(fingerprintId);
    if(student==null){
        return;
    }else{
        student = JSON.parse(student);
    }
    NEWattendence = student.attendance;
    NEWattendence = NEWattendence + 1;
    addStudent(student.name,student.rollno,student.branch,student.semester,fingerprintId,NEWattendence); // Update attendance in local storage
    newinfoBar.append(newDiv);
    newDiv.id = `student-${fingerprintId}`;
    let Addinfo = document.querySelector(`#student-${fingerprintId}`);
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
// let port;
// let reader;
// const instruction = "v"; // Instruction to send to Arduino
// const encoder = new TextEncoder();
// const decoder = new TextDecoder();
// let isConnected = false;

// // Function to connect to Arduino
// async function connectToArduino() {
//     try {
//         // Request the serial port from the user
//         port = await navigator.serial.requestPort(); // Manually select the port

//         // Open the port with the specified baud rate
//         await port.open({ baudRate: 9600 });
//         console.log("Connected to Arduino!");

//         // Set up the reader for incoming data
//         reader = port.readable.getReader();

//         isConnected = true;
//     } catch (error) {
//         console.error("Error connecting to Arduino:", error);

//         // Notify the user if the connection fails
//         alert("Failed to connect to Arduino. Please check the connection and try again.");
//     }
// }

// // Function to send instructions to Arduino
// async function sendInstructionToArduino(instruction) {
//     if (!isConnected || !port || !port.writable) {
//         console.error("Port is not open!");
//         return;
//     }

//     const writer = port.writable.getWriter();
//     await writer.write(encoder.encode(instruction + "\n")); // Send the instruction
//     writer.releaseLock();
//     console.log("Sent to Arduino:", instruction);
// }

// // Function to wait for data from Arduino
// async function waitForDataFromArduino() {
//     if (!isConnected || !port || !port.readable) return null;

//     try {
//         const { value, done } = await reader.read(); // Read data from Arduino
//         if (done) return null; // If the reader is closed, return null
//         return decoder.decode(value).trim(); // Decode the received data
//     } catch (error) {
//         console.error("Error reading from Arduino:", error);
//         return null;
//     } finally {
//         reader.releaseLock();
//     }
// }

// // Function to handle communication with Arduino
// const CALLING = async () => {
//     try {
//         await sendInstructionToArduino(instruction); // Send the instruction
//         const fingerprintId = await waitForDataFromArduino(); // Wait for the response
//         if (fingerprintId) {
//             console.log("Fingerprint ID received:", fingerprintId);
//             getStudent(fingerprintId); // Process the received fingerprint ID
//         }
//     } catch (err) {
//         console.error("Error during communication with Arduino:", err);
//     }
// };

// // Start Execution Immediately
// (async () => {
//     await connectToArduino(); // Connect to Arduino once
//     while (min != 10) { // Keep communicating until the timer reaches 10 minutes
//         await CALLING();
//     }
// })();