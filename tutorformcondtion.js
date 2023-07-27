
    var currentStept = 0;
var stepst = document.getElementsByClassName('stept');
var progressBar = document.querySelector('.progres-bar-t');

function showStept(steptIndex) {
  for (var i = 0; i < stepst.length; i++) {
    if (i === steptIndex) {
      stepst[i].classList.add('activet');
    } else {
      stepst[i].classList.remove('activet');
    }
  }
  
  var progress = ((steptIndex + 1) / stepst.length) * 100;
  progressBar.style.width = progress + '%';
}

function nextStept() {  
if (currentStept === 1) {
var isValid = tvalidateStep2();
if (!isValid) {
  return; // Don't proceed to the next step if validation fails
}
} 
else if (currentStept === 2) {
var isValid = tvalidateStep3();
if (!isValid) {
  return; // Don't proceed to the next step if validation fails
}
} 

else if (currentStept === 3) {
var isValid = ttvalidateStep4();
if (!isValid) {
  return; // Don't proceed to the next step if validation fails
}
} 

if (currentStept < stepst.length - 1) {
currentStept++;
showStept(currentStept);
}
}

function previousStept() {
  if (currentStept > 0) {
    currentStept--;
    showStept(currentStept);
  }
}

showStept(currentStept);

// Get the relevant radio options and select fields
var highschoolcertificate = document.getElementById('highschoolcertificate'); 
var tqualification = document.getElementById('tqualification'); 
var OtherQualificationdiv = document.getElementById('OtherQualificationdiv');
var vceSubjects = document.getElementById('vceSubjects');
var ibSubjects = document.getElementById('ibSubjects');
var othersubjects = document.getElementById('othersubjects');  
var vceSelectedSubjectsTable = document.getElementById('vceSelectedSubjectsTable');    
var ibSelectedSubjectsTable = document.getElementById('ibSelectedSubjectsTable');
var howdidyouhearaboutapeex = document.getElementById('How-did-you-hear-about-appex-2');
var howyouhearrefreldiv = document.getElementById('howyouhearrefreldiv');
var howyouhearotherdiv = document.getElementById('howyouhearotherdiv');
var doyouhavewwccno = document.getElementById('doyouhavewwccno');
var doyouhavewwccradiono = document.getElementById('No');
var doyouhavewwccradioyes = document.getElementById('Yes-2');
var doyouhavewwccradionot = document.getElementById('No-but-willing-to-apply-2');

// Add event listeners to the select fields

// Qualification Condtion
tqualification.addEventListener('change', function() {
if (tqualification.value === 'Other') {
 OtherQualificationdiv.style.display = 'block';
}  else {
 OtherQualificationdiv.style.display = 'none';
}
 });

// Qual Condtion
highschoolcertificate.addEventListener('change', function() {
if (highschoolcertificate.value === 'VCE') {
vceSubjects.style.display = 'block';
ibSubjects.style.display = 'none';
vceSelectedSubjectsTable.style.display = 'block';
ibSelectedSubjectsTable.style.display = 'none';
othersubjects.style.display = 'none';
} else if (highschoolcertificate.value === 'IB') {
vceSubjects.style.display = 'none';
ibSubjects.style.display = 'block';
vceSelectedSubjectsTable.style.display = 'none';
ibSelectedSubjectsTable.style.display = 'block';
othersubjects.style.display = 'none';
}

else if (highschoolcertificate.value === 'Other') {
vceSubjects.style.display = 'none';
ibSubjects.style.display = 'none';
vceSelectedSubjectsTable.style.display = 'none';
ibSelectedSubjectsTable.style.display = 'none';
othersubjects.style.display = 'block';
}
});

// Function to toggle the display of selected subjects
function toggleSubject(checkbox) {
var selectedSubjectsBody;
var subjectName = checkbox.dataset.name;
var subjectTextOnly = subjectName.replace(/\d+/g, ''); // Remove numbers from subject name
var tableBody;

if (checkbox.closest("#vceSubjects")) {
  selectedSubjectsBody = document.getElementById("vceSelectedSubjectsBody");
  tableBody = document.getElementById("vceSelectedSubjectsTable");
} else if (checkbox.closest("#ibSubjects")) {
  selectedSubjectsBody = document.getElementById("ibSelectedSubjectsBody");
  tableBody = document.getElementById("ibSelectedSubjectsTable");
} else {
  return; // If the checkbox is not in VCE or IB section, do nothing
}

// Clear the selected subjects if the checkbox is from the same section and unchecked
if (!checkbox.checked) {
  var rows = selectedSubjectsBody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (row.firstChild.textContent === subjectName) {
      row.remove();
      break;
    }
  }
}

if (checkbox.checked) {
  // Create a new row for the selected subject
  var row = document.createElement("tr");
// Create a p element to wrap the subject name
var subjectParagraph = document.createElement("p");
subjectParagraph.textContent = subjectTextOnly; // Use the text-only subject name

  // Display the subject name
      var subjectCell = document.createElement("td");
    subjectCell.appendChild(subjectParagraph);
    row.appendChild(subjectCell);

  // Create an input field for the VCE score
  var scoreInput = document.createElement("input");
  scoreInput.type = "text";
  scoreInput.name = subjectName + "Score";
  scoreInput.placeholder = "Enter your score";

  // Create a cell for the score input field
  var scoreCell = document.createElement("td");
  scoreCell.appendChild(scoreInput);
  row.appendChild(scoreCell);

  if (tableBody === document.getElementById("ibSelectedSubjectsTable")) {
    // Create radio buttons for year level (SL/HL)
    var yearLevelCell = document.createElement("td");
    var yearLevelLabel = document.createElement("label");
    yearLevelLabel.innerHTML = '<input type="radio" name="' + subjectName + 'SubjectLevel" value="SL">SL' +
      '<input type="radio" name="' + subjectName + 'SubjectLevel" value="HL">HL';
    yearLevelCell.appendChild(yearLevelLabel);
    row.appendChild(yearLevelCell);
  }

  // Append the row to the selectedSubjects table body
  selectedSubjectsBody.appendChild(row);
}
}

// Attach event listeners to the checkboxes
var checkboxes = document.querySelectorAll('#vceSubjects input[type="checkbox"], #ibSubjects input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
checkbox.addEventListener('change', function() {
  toggleSubject(this);
});
});
// Add event listener to control the visibility of the tables
document.getElementById("vceSubjects").addEventListener("click", function () {
document.getElementById("vceSelectedSubjectsTable").style.display = "block";
document.getElementById("ibSelectedSubjectsTable").style.display = "none";
});

document.getElementById("ibSubjects").addEventListener("click", function () {
document.getElementById("vceSelectedSubjectsTable").style.display = "none";
document.getElementById("ibSelectedSubjectsTable").style.display = "block";
});

howdidyouhearaboutapeex.addEventListener('change', function() {
if (howdidyouhearaboutapeex.value === 'Referral') {
 howyouhearrefreldiv.style.display = 'block';
howyouhearotherdiv.style.display = 'none';

} else if (howdidyouhearaboutapeex.value === 'Others') {
 howyouhearotherdiv.style.display = 'block';
 howyouhearrefreldiv.style.display = 'none';
}

else {
 howyouhearotherdiv.style.display = 'none';
 howyouhearrefreldiv.style.display = 'none';
}
});     

doyouhavewwccradiono.addEventListener('change', function() {
if (doyouhavewwccradiono.checked) {
doyouhavewwccno.style.display = 'block';
}  
});


doyouhavewwccradioyes.addEventListener('change', function() {
if (doyouhavewwccradioyes.checked){
 doyouhavewwccno.style.display = 'none';
}
});

doyouhavewwccradionot.addEventListener('change', function() {
if (doyouhavewwccradionot.checked){
doyouhavewwccno.style.display = 'none';
}
});


  


