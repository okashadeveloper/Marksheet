const students = [];

const addBtn = document.getElementById('addStudent');
const showBtn = document.getElementById('showMarksheet');
const nameInput = document.getElementById('studentName');
const container = document.getElementById('marksheetContainer');
const inputSection = document.getElementById('inputSection');
const eng = document.getElementById('eng');
const math = document.getElementById('math');
const sci = document.getElementById('sci');
const comp = document.getElementById('comp');
const urdu = document.getElementById('urdu');

addBtn.addEventListener('click', function() {
  const name = nameInput.value.trim();
  const subjects = [
    Number(eng.value),
    Number(math.value),
    Number(sci.value),
    Number(comp.value),
    Number(urdu.value)
  ];

 
  if (name === "" || subjects.some(m => isNaN(m) || m < 0 || m > 100)) {
    alert("Please enter valid name and marks (0–100) for all subjects");
    return;
  }

  students.push({ name: name, subjects: subjects });
  nameInput.value = "";
  eng.value = math.value = sci.value = comp.value = urdu.value = "";
  alert("Student added successfully!");
});

showBtn.addEventListener('click', function() {
  if (students.length === 0) {
    alert("Please add at least one student!");
    return;
  }

  inputSection.style.display = "none";
  container.style.display = "block";
  container.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const marks = student.subjects;
    let total = 0;
    let failFlag = false;

    for (let j = 0; j < marks.length; j++) {
      total += marks[j];
      if (marks[j] < 40) failFlag = true;
    }

    const percentage = (total / 500) * 100;
    let grade = "";
    let status = "";

    if (failFlag) {
      grade = "Fail";
      status = "Fail";
      failAnimation();
    } else {
      if (percentage < 50) grade = "E";
      else if (percentage < 60) grade = "D";
      else if (percentage < 70) grade = "B";
      else if (percentage < 80) grade = "A";
      else grade = "A1";
      status = "Pass";
      passAnimation();
    }

    const div = document.createElement('div');
    div.className = "student-card animate__animated animate__fadeInUp";
    div.innerHTML = `
      <h3>${student.name}</h3>
      <p>Total Marks: ${total} / 500</p>
      <p>Percentage: ${percentage.toFixed(2)}%</p>
      <p>Grade: ${grade}</p>
      <p>Status: ${status}</p>
    `;
    container.appendChild(div);
  }
});

function passAnimation() {
  confetti({
    particleCount: 2000,
    spread: 80,
    origin: { y: 0.7 }
  });
}

function failAnimation() {
  const container = document.querySelector('.container');
  container.classList.add("animate__animated", "animate__shakeX");
  setTimeout(() => {
    container.classList.remove("animate__animated", "animate__shakeX");
  }, 1000);
}
