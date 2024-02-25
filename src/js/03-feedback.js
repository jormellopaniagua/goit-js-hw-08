import { throttle } from 'lodash-es';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

// Función para guardar el estado del formulario en el almacenamiento local
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

// Función para cargar el estado del formulario desde el almacenamiento local
const loadFormState = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const { email, message } = JSON.parse(storedState);
    emailInput.value = email;
    messageTextarea.value = message;
  }
};

// Cargar el estado del formulario al cargar la página
loadFormState();

// Escuchar el evento input en el formulario y guardar el estado
feedbackForm.addEventListener('input', saveFormState);

// Escuchar el evento submit en el formulario
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(formState);
  // Limpiar el almacenamiento y los campos del formulario
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';
});
