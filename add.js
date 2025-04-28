// ARDUINO INTEGRATION FOR FINGERPRINT ENROLLMENT (Add.js)


let addPort, addReader, addWriter;
let enrolledId = null;
const addEncoder = new TextEncoder();
const addDecoder = new TextDecoder();

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

// Send "ENROLL" and read enrolled fingerprint ID
async function enrollFingerprint() {
    enrolledId = null; // Reset enrolledId before starting the enrollment process
    if (!addPort || !addWriter || !addReader) {
        alert("Arduino not connected or reader not available!");
        return;
    }

    try {
        await addWriter.write(addEncoder.encode("ENROLL\n"));
        alert("Place finger on the sensor...");

        let error = null;
        const startTime = Date.now();
        const timeout = 40000;

        while (Date.now() - startTime < timeout) {
            const { value, done } = await addReader.read();
            if (done) break;
            const response = addDecoder.decode(value).trim();
            console.log("Arduino Response (Enroll):", response);
            const match = response.match(/EXISTING_ID:([^\n\r]+)/);
            const match2 = response.match(/ENROLL_SUCCESS:([^\n\r]+)/);
            if (match) {
                const existingId= match[1].match(/\d+/)?.[0];
                enrolledId = existingId;
            } else if(match2) {
                const existingId= match2[1].match(/\d+/)?.[0];
                enrolledId = existingId;
            }else{
                error = "Enrollment Failed!";
                enrolledId = null;
                break;
            }
          
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        if (error) {
            alert(error);
        } else if (!enrolledId) {
            alert("Enrollment process timed out or ended unexpectedly.");
        }
    } catch (readError) {
        console.error("Error reading from serial port:", readError);
        alert("Error reading enrollment response from Arduino.");
    } finally {
        if (addReader) addReader.releaseLock();
    }
}

// Attach button listeners
const connectAddButton = document.querySelector("#connectArduinoAdd");
connectAddButton.addEventListener("click", connectArduinoForAdd);

const enrollButton = document.querySelector("#enrollFingerprintButton");
enrollButton.addEventListener("click", enrollFingerprint);
//MAIN CODE 
//update and add the value of fingerprintId in local storage
const addStudent=(name,rollno,branch,semester,enrolledId,attendence)=>{
    localStorage.setItem(enrolledId,JSON.stringify({name:name, rollno: rollno,branch:branch,semester: semester,enrolledId:enrolledId,attendance:attendence}));
}
let textName;
let textRollNo;
let selectBranch;
let selectSemester;
let passkey;
let textAtten;
let subBtn = document.querySelector(".button");
const newdetails=(enrolledId)=>{
    let Student = JSON.parse(localStorage.getItem(enrolledId));
    if(passkey.value==="T20P16C3"){
        textName = document.querySelector(".textarea");
        textAtten = document.querySelector("#atten");
        textRollNo = document.querySelector("#rollno");
        selectBranch = document.querySelector(".branch");
        selectSemester = document.querySelector(".semester");
        if(textAtten.value===""){
            let prAtten = Student.attendance;
            addStudent(textName.value,textRollNo.value,selectBranch.value,selectSemester.value,enrolledId,prAtten);//ADD FINGERPRINT ID HERE
        }else{
            addStudent(textName.value,textRollNo.value,selectBranch.value,selectSemester.value,enrolledId,textAtten.value);//ADD FINGERPRINT ID HERE
        }    
    }
    else{
        alert("Incorrect password or password field is empty");
    }
    console.log(enrolledId);
}
subBtn.addEventListener("click",()=>{
    passkey = document.querySelector("#password");
    console.log(enrolledId)
    newdetails(enrolledId);
});