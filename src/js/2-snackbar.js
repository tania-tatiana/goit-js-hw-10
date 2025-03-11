// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = form.querySelector('.promise-delay-input');
const fulfilledInput = form.querySelector('.promise-state-input-fulfilled');
const rejectedInput = form.querySelector('.promise-state-input-rejected');

form.addEventListener('submit', myPromise);
function myPromise(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const delayValue = parseInt(delay.value);
      if (fulfilledInput.checked) {
        resolve(`Fulfilled promise in ${delayValue}ms`);
      } else if (rejectedInput.checked) {
        reject(`Rejected promise in ${delayValue}ms`);
      }
    }, delay.value);
  });
  promise
    .then(result => {
      console.log(result);
      iziToast.success({
        title: 'OK',
        message: result,
        position: 'topRight',
        iconText: '✅',
      });
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: error,
        position: 'topRight',
        iconText: '❌',
      });
    });
}
