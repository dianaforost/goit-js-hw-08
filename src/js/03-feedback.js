import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
let formData = {};

function valueInForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  console.log(formData);
}

function submitInForm(event) {
  event.preventDefault();
  event.target.reset();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
}

function updateOutput() {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formState) {
    email.value = formState.email;
    message.value = formState.message;
  } else {
    email.value = '';
    message.value = '';
  }
}
updateOutput();

form.addEventListener('input', throttle(valueInForm, 500));
form.addEventListener('submit', submitInForm);
