
/* 
    The purpose of this JavaScript file is
    to establish certain parameters for user input,
    as well as adding function to our audio buttons.

    author: Adam Rossi (Group leader), Jan Zubalski,
            Thais Serpa Chaves, Jack Aroyan
*/

function lightMode() {

}

function darkMode() {

}

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
    // if the number is less than 7 to return the the digits with brackets around the first 3, plus the rest of the digits
    // slice method is used to take index or digit 0, 1 and 2 and return the brackets around it
    // slice method is used again to take everything from index 3 which is the fourth letter to the end
    if (NumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    // if more than 7 digits return the first 3 with brackets around them, then space then 3 digits then - and the rest digits
    // slice method is used to take index or digit 0, 1 and 2 and return the brackets around it
    // slice method is used to take index or digit 3, 4 and 5 and return them with a dash after them
    // slice method is used again to take everything from index 6 which is the seventh digit until the 10th digit which is index 9
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

function playRecording(id) {
    let audioFile;
    if (id === 1) {
        audioFile = 'Recordings/fullName.mp3';
        console.log("Playing recording 1");
    } else if (id === 2) {
        audioFile = 'Recordings/dob.mp3';
        console.log("Playing recording 2");
    } else if (id === 3) {
        audioFile = 'Recordings/phoneNumber.mp3';
        console.log("Playing recording 3");
    } else if (id === 4) {
        audioFile = 'Recordings/relativesPhone.mp3';
        console.log("Playing recording 4");
    } else if (id === 5) {
        audioFile = 'Recordings/emailAddress.mp3';
        console.log("Playing recording 5");
    } else if (id === 6) {
        audioFile = 'Recordings/fullOrPartial.mp3';
        console.log("Playing recording 6");
    } else if (id === 7) {
        audioFile = 'Recordings/burialLocation.mp3';
        console.log("Playing recording 7");
    } else if (id === 8) {
        audioFile = 'Recordings/casketMaterial.mp3';
        console.log("Playing recording 8");
    } else if (id === 9) {
        audioFile = 'Recordings/marker.mp3';
        console.log("Playing recording 9");
    }

     // Create a new Audio object with the specified audio file source
     let audio = new Audio(audioFile);

     // Play the audio
     audio.play();
}
