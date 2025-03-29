//update and add the value of fingerprintId in local storage
const addStudent=(name,rollno,branch,semester,fingerprintId,attendence)=>{
    localStorage.setItem(fingerprintId,JSON.stringify({name:name, rollno: rollno, semester: semester, branch:branch,atttendence:attendence}));
}