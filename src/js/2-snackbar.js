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
        resolve(delayValue);
      } else if (rejectedInput.checked) {
        reject(delayValue);
      }
    }, delay.value);
  });
  promise
    .then(delayValue => {
      console.log(`Promise fulfilled after ${delayValue}ms`);
      iziToast.success({
        title: 'OK',
        message: `Promise fulfilled after ${delayValue}ms`,
        position: 'topRight',
        iconText: '✅',
      });
    })
    .catch(delayValue => {
      console.log(`Promise rejected after ${delayValue}ms`);
      iziToast.error({
        title: 'Error',
        message: `Promise rejected after ${delayValue}ms`,
        position: 'topRight',
        icon: '❌',
        iconText: '❌',
      });
    });
}
