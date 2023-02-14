import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
let formData = {};

updateOutput();

function valueInForm(event) {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  updateOutput();
}

function submitInForm(event) {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  formData = {};
  console.log(event.currentTarget);
  console.log(event.target);
}

function updateOutput() {
  const formState = localStorage.getItem('feedback-form-state');
  const formObjectState = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  if (formState) {
    email.value = formObjectState.email || '';
    message.value = formObjectState.message || '';
  }
}

form.addEventListener('input', throttle(valueInForm, 500));
form.addEventListener('submit', submitInForm);
