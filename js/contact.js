const containerForm = document.querySelector(".containerForm");
const form = document.querySelector("#contactForm");

const name = document.querySelector("#fullName");
const nameError = document.querySelector("#nameError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

function validateForm(event) {
  event.preventDefault();
  //count how many inputs that are valid.
  let count = 0;
  //Check if user has entered valid inputs, if false, show the error message by display it as block.
  if (checkLength(fullName.value, 0)) {
    nameError.style.display = "none";
    count += 1;
  } else {
    nameError.style.display = "block";
  }
  if (checkLength(subject.value, 9)) {
    subjectError.style.display = "none";
    count += 1;
  } else {
    subjectError.style.display = "block";
  }
  if (checkLength(address.value, 24)) {
    addressError.style.display = "none";
    count += 1;
  } else {
    addressError.style.display = "block";
  }
  if (checkEmail(email.value)) {
    emailError.style.display = "none";
    count += 1;
  } else {
    emailError.style.display = "block";
  }
  //if all inputs (4) are valid, display message.
  if (count === 4) {
    containerForm.innerHTML += `<div class="success-message">Your submission was a success!</div>`;
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, length) {
  if (value.trim().length > length) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regularExpression = /\S+@\S+\.\S+/;
  const matchExpressionString = regularExpression.test(email);
  return matchExpressionString;
}
