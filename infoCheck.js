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
            if(min===10){
                return;
            }
    }else{
        sec++;
        secinner.innerText=sec;
    }
}
setInterval(()=>{
    timerFun();
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
// while(min!=10){
//     fingerprintId;//get the fingerprintId from the fingerprint scanner
//     getStudent(fingerprintId);
// }
getStudent("fingerprintId1");
getStudent("fingerprintId2");
getStudent("fingerprintId3");
// getStudent("fingerprintId1");
// getStudent("fingerprintId1");
// getStudent("fingerprintId1");
// getStudent("fingerprintId1");
// getStudent("fingerprintId1");
// getStudent("fingerprintId1");


