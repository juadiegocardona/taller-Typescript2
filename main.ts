

import { Course } from './course.js';

import {Student} from './student.js'

import { dataCourses } from './dataCourses.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox3: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;



btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick=()=> applyFilterByCredits();

renderStudentInfo(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

function renderStudentInfo(students:Student[]): void {
    console.log('Desplegando info del estudiante');
    students.forEach((student) => {
      let trElement2 = document.createElement("tr");
      let trElement3 = document.createElement("tr");
      let trElement4 = document.createElement("tr");
      let trElement5 = document.createElement("tr");
      let trElement6 = document.createElement("tr");
      let trElement7 = document.createElement("tr");
      trElement2.innerHTML = `<td>${student.name}</td>`
      trElement3.innerHTML = `<td>${student.code}</td>`
      trElement4.innerHTML = `<td>${student.id}</td>`
      trElement5.innerHTML = `<td>${student.age}</td>`
      trElement6.innerHTML = `<td>${student.address}</td>`
      trElement7.innerHTML = `<td>${student.phone}</td>`;
      studentTbody.appendChild(trElement2);
      studentTbody.appendChild(trElement3);
      studentTbody.appendChild(trElement4);
      studentTbody.appendChild(trElement5);
      studentTbody.appendChild(trElement6);

      studentTbody.appendChild(trElement7);



    });
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function applyFilterByCredits() { 
    let text1 = inputSearchBox2.value;
    let text2 = inputSearchBox3.value;
    text1 = (text1 == null) ? '' : text1;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(text1,text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}
function searchCourseByCredits(minKey: string, maxKey: string, courses: Course[]) {
    return minKey === '' || maxKey===''? dataCourses : courses.filter( c => 
      (c.credits>=parseInt(minKey) && c.credits<=parseInt(maxKey)));
  }
  

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

