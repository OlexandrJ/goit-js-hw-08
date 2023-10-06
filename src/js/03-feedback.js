import throttle from 'lodash.throttle';

function saveFormDataToLocalStorage(event) {
  const formData = {
    email: event.target.querySelector('input[name="email"]').value,
    message: event.target.querySelector('textarea[name="message"]').value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function populateFormFieldsFromLocalStorage() {
  const savedFormData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedFormData) {
    const emailInput = document.querySelector('input[name="email"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');

    emailInput.value = savedFormData.email;
    messageTextarea.value = savedFormData.message;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');

  emailInput.value = '';
  messageTextarea.value = '';

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log(formData);
}

const feedbackForm = document.querySelector('.feedback-form');
feedbackForm.addEventListener('input', throttle(saveFormDataToLocalStorage, 500));
feedbackForm.addEventListener('submit', handleFormSubmit);

populateFormFieldsFromLocalStorage();
