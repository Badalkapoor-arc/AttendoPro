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
let fingerprintId;
const getStudent=(fingerprintId)=>{
    let newDiv = document.createElement("div");
    let student =localStorage.getItem(fingerprintId);
    if(student==null){
        return;
    }else{
        student = JSON.parse(student);
    }
    newinfoBar.append(newDiv);
    newDiv.id = `student-${fingerprintId}`;
    let Addinfo = document.querySelector(`#student-${fingerprintId}`);
    newDiv.className = "infoarea";
    console.log(student.name);
    Addinfo.innerHTML = `
    <div class="container">
        <span>Name: ${student.name}</span>
        <span>Roll NO.: ${student.rollno}</span>
        <span>Branch: ${student.branch}</span>
    </div>
    <div class="container1">
        <span>Semester: ${student.semester}</span>
        <span>Attendance: ${student.attendence}</span>
    </div>
`;
}
const port = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = async ()=>{
    await port.pipe(new ReadlineParser({ delimiter: '\n' }));
};
const sendInstructionToArduino = async(instruction) => {
    if (!instruction) {
        console.error('No instruction provided to send to Arduino.');
        return;
    }
    return new Promise((resolve, reject) => {
        port.write(instruction + '\n', (err) => {
            if (err) {
                console.error('Error writing to Arduino:', err.message);
                reject(err);
            } else {
                console.log('Instruction sent to Arduino:', instruction);
                resolve();
            }
        });
    });
};
const waitForDataFromArduino = () => {
    return new Promise((resolve) => {
        parser.once('data', (data) => {
            console.log('Data received from Arduino:', data.trim());
            resolve(data.trim());
        });
    });
};
let instruction;
const CALLING = async () => {
    try {
        // Send instruction to Arduino
        await sendInstructionToArduino(instruction);

        // Wait for data from Arduino
        const fingerprintId = await waitForDataFromArduino();

        // Process the received data
        getStudent(fingerprintId);
    } catch (err) {
        console.error('Error during communication with Arduino:', err);
    }
};
const startLoop = async () => {
    while (min != 10) {
        await CALLING();

        // Add a delay of 1 second between iterations to prevent overwhelming the Arduino
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
};

