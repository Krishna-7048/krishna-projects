function calculateResult() {
  let marks = [
    parseFloat(document.getElementById("sub1").value),
    parseFloat(document.getElementById("sub2").value),
    parseFloat(document.getElementById("sub3").value),
    parseFloat(document.getElementById("sub4").value)
  ];
  let total = 0;
  for (let i = 0; i < marks.length; i++) {
    total = total + marks[i];
  }
  let average = total / marks.length;
  let grade;
  if (average >= 90) {
    grade = "A";
  } else if (average >= 75) {
    grade = "B";
  } else if (average >= 60) {
    grade = "C";
  } else if (average >= 40) {
    grade = "D";
  } else {
    grade = "F";
  }
  document.getElementById("output").innerHTML = `
    <p>Total Marks: ${total}</p>
    <p>Average Marks: ${average.toFixed(2)}</p>
    <p class="grade">Grade: ${grade}</p>
  `;
}