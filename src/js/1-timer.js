// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const timerWrapper = document.querySelector('.timer-wrapper');
const timer = document.querySelector('.timer');
const input = timerWrapper.querySelector('.timer-input');
const button = timerWrapper.querySelector('.timer-button');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: 'white',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

button.addEventListener('click', () => {
  // Перевірка, чи дата вибрана та в майбутньому
  if (!userSelectedDate || userSelectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: 'white',
    });
    button.disabled = true; // деактивуємо кнопку
    return;
  }

  // Деактивація кнопки та інпуту під час таймера
  button.disabled = true;
  input.disabled = true;

  timer.classList.add('timer-running');

  const intervalId = setInterval(() => {
    const remainingTime = convertMs(userSelectedDate - new Date());

    // (НЕ ПРАЦЮЄ) Оновлення інтерфейсу з використанням addLeadingZero для кожної одиниці часу
    // timer.textContent = `${addLeadingZero(remainingTime.days)}:${addLeadingZero(
    //   remainingTime.hours
    // )}:${addLeadingZero(remainingTime.minutes)}:${addLeadingZero(
    //   remainingTime.seconds
    // )}`;

    timer.querySelector('[data-days]').textContent = addLeadingZero(
      remainingTime.days
    );
    timer.querySelector('[data-hours]').textContent = addLeadingZero(
      remainingTime.hours
    );
    timer.querySelector('[data-minutes]').textContent = addLeadingZero(
      remainingTime.minutes
    );
    timer.querySelector('[data-seconds]').textContent = addLeadingZero(
      remainingTime.seconds
    );

    // Перевірка на 0
    if (
      remainingTime.days === 0 &&
      remainingTime.hours === 0 &&
      remainingTime.minutes === 0 &&
      remainingTime.seconds === 0
    ) {
      clearInterval(intervalId); // зупиняємо таймер
      button.disabled = false;
      input.disabled = false;
    }
  }, 1000);
});
