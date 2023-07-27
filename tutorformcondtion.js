
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
var isValid = tvalidateStep4();
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


 function tvalidateStep2() {

  var step5ErrorselectMessage = document.getElementById('step5ErrorselectMessage');
  var step5ErrorfilloutMessage = document.getElementById('step5ErrorfilloutMessage');
  var step5ErrorvalidemailMessage = document.getElementById('step5ErrorvalidemailMessage');
  const OtherQualificationdiv = document.getElementById('OtherQualificationdiv');
  const howyouhearrefreldiv = document.getElementById('howyouhearrefreldiv');
  const howyouhearotherdiv = document.getElementById('howyouhearotherdiv');
 

  step5ErrorselectMessage.style.display = 'none';
  step5ErrorfilloutMessage.style.display = 'none';
  step5ErrorvalidemailMessage.style.display = 'none';
    
     // Validate text input fields
     var textfield = document.getElementById('Tutor-Name');
    var textValue = textfield.value.trim();
    if (textValue === '') {
      // Display error message for empty field
      step5ErrorfilloutMessage.style.display = 'block';
      return false; // Validation failed
    } 
    
    
      // Validate email field
      var emailField = document.getElementById('Tutor-Email');
      var emailValue = emailField.value.trim();
      if (emailValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } else {
        // Validate email format using regular expression
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          step5ErrorvalidemailMessage.style.display = 'block';
          return false; // Validation failed
        }
      }
    
      // Validate phone field
      var phoneField = document.getElementById('Tutor-Mobile');
      var phoneValue = phoneField.value.trim();
      if (phoneValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } 
   
   
   // Validate High School Certificate
      var highschoolcrtField = document.getElementById('highschoolcertificate');
      var highschoolcrtValue = highschoolcrtField.value.trim();
      if (highschoolcrtValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } 
    
     // Validate High School
      var highschoolField = document.getElementById('High-School');
      var highschoolValue = highschoolField.value.trim();
      if (highschoolValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } 
   
   // Validate Qualification
      var QualificationField = document.getElementById('High-School');
      var QualificationValue = QualificationField.value.trim();
      if (QualificationValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } 
    
    // Validate what degree
      var QualificationField = document.getElementById('What-Degree-2');
      var QualificationValue = QualificationField.value.trim();
      if (QualificationValue === '') {
        step5ErrorfilloutMessage.style.display = 'block';
        return false; // Validation failed
      } 
   
    
    // Validate what degree
      var QualificationField = document.getElementById('SelectGraduatingClass');
      var QualificationValue = QualificationField.value.trim();
      if (QualificationValue === '') {
       step5ErrorselectMessage.style.display = 'block';
        return false; // Validation failed
      } 
   
   
   // Validate what degree
      var QualificationField = document.getElementById('tqualification');
      var QualificationValue = QualificationField.value.trim();
      if (QualificationValue === '') {
       step5ErrorselectMessage.style.display = 'block';
        return false; // Validation failed
      } 
   
   
   // Validate what degree
      var QualificationField = document.getElementById('How-did-you-hear-about-appex-2');
      var QualificationValue = QualificationField.value.trim();
      if (QualificationValue === '') {
       step5ErrorselectMessage.style.display = 'block';
        return false; // Validation failed
      } 
    
    var textFieldpname = document.getElementById('How-you-hear-other-3');
    var isHiddenpnamedivVisible = howyouhearotherdiv.style.display === 'block'; // Check if the hidden div is visible
    
    if (isHiddenpnamedivVisible) {
      var textpnamedValue = textFieldpname.value.trim();
    
      if (textpnamedValue === '') {
         step5ErrorfilloutMessage.style.display = 'block'; // Show the error message
        return false; // Validation failed
      } 
    }
    
    var textFieldpmobile = document.getElementById('How-you-hear-referral-3');
    var isHiddenpmobiledivVisible = howyouhearrefreldiv.style.display === 'block'; // Check if the hidden div is visible
    
    if (isHiddenpmobiledivVisible) {
      var textpmobileValue = textFieldpmobile.value.trim();
    
      if (textpmobileValue === '') {
        step5ErrorfilloutMessage.style.display = 'block'; // Show the error message
        return false; // Validation failed
      } 
    }
    
    var emailFieldpemail = document.getElementById('Other-Qualification-2');
    var isHiddenpemaildivVisible = OtherQualificationdiv.style.display === 'block'; // Check if the hidden div is visible
    
    if (isHiddenpemaildivVisible) {
      var textpemailValue = emailFieldpemail.value.trim();
    
      if (textpemailValue === '') {
        step5ErrorfilloutMessage.style.display = 'block'; // Show the error message
        return false; // Validation failed
      } 
    }
    
   
      return true; // Validation succeeded
    }
      
    
  
     function tvalidateStep3() {
      // Reset error message and field highlight
      var errorFileUploadMessage = document.getElementById('step3ErrorfileUploadMessage');
      errorFileUploadMessage.style.display = 'none';
  
      // Validate file upload field
      var fileUploadField = document.getElementById('fileUpload');
      if (!fileUploadField.files || fileUploadField.files.length === 0) {
        errorFileUploadMessage.style.display = 'block';
        return false; // Validation failed
      }
  
      return true; // Validation passed
    }
   
    function tvalidateStep4() {
      // Reset error messages and field highlights
     
      var step4ErrorfilloutMessage = document.getElementById('step4ErrorfilloutMessage');
      var step4ErrorradioMessage = document.getElementById('step4ErrorradioMessage');
       step4ErrorfilloutMessage.style.display = 'none';
            step4ErrorradioMessage.style.display = 'none';
      // Validate radio button groups
      var radioGroups = document.querySelectorAll('.radio-group');
      var isValid = true;
  
      radioGroups.forEach(function(group) {
        var groupName = group.getAttribute('name');
        var errorRadioMessage = document.getElementById('error-' + groupName);
  
        var isChecked = Array.from(group.querySelectorAll('input[type="radio"]')).some(function(radio) {
          return radio.checked;
        });
  
        if (!isChecked) {
          step4ErrorradioMessage.style.display = 'block';
          isValid = false;
        }
      });
  
  
      // Validate text input fields
     var textFieldname = document.getElementById('Tutor-Suburb');
    var textValue = textFieldname.value.trim();
    if (textValue === '') {
      // Display error message for empty field
      step4ErrorfilloutMessage.style.display = 'block';
      return false; // Validation failed
    } 
      
      
       var textFieldname = document.getElementById('How-far-are-you-willing-to-travel-2');
    var textValue = textFieldname.value.trim();
    if (textValue === '') {
      // Display error message for empty field
      step4ErrorfilloutMessage.style.display = 'block';
      return false; // Validation failed
    } 
  
  
