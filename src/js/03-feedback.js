import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function loadFormState() {
  const formData = localStorage.getItem('feedback-form-state');
  if (formData) {
    const { email, message } = JSON.parse(formData);
    emailInput.value = email;
    messageTextarea.value = message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formData);
}

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);

loadFormState();
