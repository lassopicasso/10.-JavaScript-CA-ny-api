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
  let count = 0;
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
  if (count === 4) {
    containerForm.innerHTML += `<div class="success-message">Your submission was a success!</div>`;
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
