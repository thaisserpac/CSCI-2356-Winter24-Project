/* 
    The purpose of this JavaScript file is
    to establish certain parameters for user input,
    as well as adding function to our audio buttons.

    author: Adam Rossi (Group leader), Jan Zubalski,
            Thais Serpa Chaves, Jack Aroyan
*/

// call function handleDisplay() when loading the browser
window.addEventListener("load", handleDisplay);

tailwind.config = {
    darkMode: 'selector',
    theme: {
      fontFamily: {
        sans: ['Calibri'],
        mono: ['Courier New']
      }
    },
}


let evenIsDarkMode = 1; // used to indicate whether the current display state
                        // is dark mode (even) or light mode (odd)
                        // Special note: the value of this variable is persistent
                        //               because it has global scope

function toggleDarkMode() {
    // test whether evenIsDarkMode is an even or odd number
    if (evenIsDarkMode % 2 == 0){
        document.getElementById("main").classList.remove('dark');
    } else {
        document.getElementById("main").classList.add('dark');
    }
    // increment evenIsDarkMode so its even or odd value is synchronized with
    // the current display state
    evenIsDarkMode++;
}

// the following 2 functions are to add the brackets and dash for the phone numbers inputs
function phoneNumberFormat(){
    // setting the inputField to the contact-info input
    const inputField = document.getElementById('contact_info');
    const inputField2 = document.getElementById('relative_number');
    // setting the inputField value to a new modified format which is explained in the next function
    const modifiedInputField = modifiedPhoneNumber(inputField.value);
    const modifiedInputField2 = modifiedPhoneNumber(inputField2.value);
    // setting the modified value to the inputField value
    inputField.value = modifiedInputField;
    inputField2.value = modifiedInputField2;
}

function modifiedPhoneNumber(value){
    // if user deletes the input
    if (!value) return value;
    // replacing any non-numeric input with nothing (''), this is used to clean the input so if we put letter it replaces it with nothing
    const phoneNumber = value.replace(/[^\d]/g, '');
    // NumberLength is the length of the array
    const NumberLength = phoneNumber.length;
    // if the input length is less than 4 digits 
    if (NumberLength < 4) return phoneNumber;
    // if the number is less than 7  return the the digits with brackets around the first 3, plus the rest of the digits
    // slice method is used to take first, second and third digits and return the brackets around it
    // slice method is used again to take everything after third digit 
    if (NumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    // if more than 7 digits return the first 3 with brackets around them, then space then 3 digits then - and the rest digits
    // slice method is used to take the first 3 digits and return the brackets around it
    // slice method is used to take the 4th, 5th and 6th digits and return them with a dash after them
    // slice method is used again to take everything after the 6th up to 9 digits
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}`;
}
// the following 2 functions are to add the dashes for the date input
function dateFormat(){
    // setting the inputField to the birth_date input
    const inputField = document.getElementById('birth_date');
    // setting the inputField value to a new modified format which is explained in the next function
    const modifiedDate = modifiedDateFormat(inputField.value);
    // setting the modified value to the inputField value
    inputField.value = modifiedDate;
}

function modifiedDateFormat(value){
    // if user deletes the input
    if (!value) return value;
    // replacing any non-numeric input with nothing (''), this is used to clean the input so if we put letter it replaces it with nothing
    const date = value.replace(/[^\d]/g, '');
    // NumberLength is the length of the array
    const NumberLength = date.length;
    // if the input length is less than 2 digits 
    if (NumberLength < 2) return date;
    // if the number is less than 4 return the the digits with dash after the first 2 digits then the rest of the digits
    // slice method is used to take index or digit 0, 1 and return the dash after them
    // slice method is used again to take everything from index 2 which is the third digit to the rest
    if (NumberLength < 4) {
        return `${date.slice(0, 2)}-${date.slice(2)}`;
    }
    // if more than 4 digits return the first 2 then dahs then the next 2 digits then another dash then the rest of 4 numbers
    // slice method is used to take first and second digits and return the dash after them
    // slice method is used to take third and fourth digits return them with a dash after them
    // slice method is used again to take everything from the fifth digit up to 8 digits
    return `${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4, 7)}`;
}

function handleSubmitUserInfo() {
    // const values are given for name & birth_date & phone numbers & email 
    const nameInput = document.getElementById('full_name');
    const dateInput = document.getElementById('birth_date');
    const contactInput = document.getElementById('contact_info');
    const relativeInput = document.getElementById('relative_number');
    const emailInput = document.getElementById('email');

    // creating object to store input values, keys are userName & date & contact & relative & email, their values are used from const above
    const userInputValues = {
        userName: nameInput.value,
        date: dateInput.value,
        contact: contactInput.value,
        relative: relativeInput.value,
        email: emailInput.value,  
    }
    // store user input values in local storage as Json string 
    localStorage.setItem('strUserInputValues',JSON.stringify(userInputValues));
    handleDisplay();
    // clear input fields after submission
    nameInput.value = '';
    dateInput.value = '';
    contactInput.value = '';
    relativeInput.value = '';
    emailInput.value = '';
}

function handleSubmitBurialChoices() {
    // Get all selected radio button values
    var burialType = document.querySelector('input[name="burial-type"]:checked').value;
    var burialArea = document.querySelector('input[name="burial-area"]:checked').value;
    var casketMaterial = document.querySelector('input[name="casket-material"]:checked').value;
    var markerOption = document.querySelector('input[name="marker-option"]:checked').value;
    
    // Store burial options values as object
    const burialOptions = {
        burialType,
        burialArea,
        casketMaterial,
        markerOption
    }
    // store user input values in local storage as Json string 
    localStorage.setItem('strBurialOptions',JSON.stringify(burialOptions));

}

// second function is to handle displaying stored input on the last div
function handleDisplay() {
    //  retreiving user inputs values from local storage
    // using json.parse to change the values back from string to js object
    userObj = JSON.parse(localStorage.getItem('strUserInputValues'));
    burialOptions = JSON.parse(localStorage.getItem('strBurialOptions'));
    // displaying inputs on the last div using userobj object & burialOptions object
    document.getElementById('displayInputs').innerHTML = `User Name: ${userObj.userName}<br>
        Date of Birth: ${userObj.date}<br> 
        Phone Number: ${userObj.contact}<br> 
        Relative Phone Number: ${userObj.relative}<br> 
        Email Address: ${userObj.email}<br>
        Burial Type: ${burialOptions.burialType}<br>
        Burial Area: ${burialOptions.burialArea}<br>
        Casket Material: ${burialOptions.casketMaterial}<br>
        Marker Option: ${burialOptions.markerOption}<br>` ;

}

function playRecording(id) {
    let audioFile;
    switch (id) {
        case 1:
            audioFile = 'Recordings/fullName.mp3';
            if (voice2) {
                audioFile = 'Recordings/fullNameVoice2.mp3';
            }
            break;
        case 2:
            audioFile = 'Recordings/dob.mp3';
            if (voice2) {
                audioFile = 'Recordings/dobVoice2.mp3';
            }
            break;
        case 3:
            audioFile = 'Recordings/phoneNumber.mp3';
            if (voice2) {
                audioFile = 'Recordings/phoneNumberVoice2.mp3';
            }
            break;
        case 4:
            audioFile = 'Recordings/relativesPhone.mp3';
            if (voice2) {
                audioFile = 'Recordings/relativesPhoneVoice2.mp3';
            }
            break;
        case 5:
            audioFile = 'Recordings/emailAddress.mp3';
            if (voice2) {
                audioFile = 'Recordings/emailAddressVoice2.mp3';
            }
            break;
        case 6:
            audioFile = 'Recordings/fullOrPartial.mp3';
            if (voice2) {
                audioFile = 'Recordings/fullOrPartialVoice2.mp3';
            }
            break;
        case 7:
            audioFile = 'Recordings/burialLocation.mp3';
            if (voice2) {
                audioFile = 'Recordings/burialLocationVoice2.mp3';
            }
            console.log("Playing recording 7");
            break;
        case 8:
            audioFile = 'Recordings/casketMaterial.mp3';
            if (voice2) {
                audioFile = 'Recordings/casketMaterialVoice2.mp3';
            }
            break;
        case 9:
            audioFile = 'Recordings/marker.mp3';
            if (voice2) {
                audioFile = 'Recordings/markerVoice2.mp3';
            }
            break;
        default:
            console.log("Invalid id");
    }

     // Create a new Audio object with the specified audio file source
     let audio = new Audio(audioFile);

     // Play the audio
     audio.play();
}
let voice2 = false;
function changeVoice() {
    if (voice2 == false) {
        voice2 = true;
        return;
    }
    voice2 = false;
}