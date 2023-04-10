import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  timeInput: document.getElementById('datetime-picker'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),
};
let TIMER_DEADLINE = null;
let timerId = null;
refs.btnStart.disabled = true;
//* FLATPEKR options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    Notiflix.Notify.info('Date selected press the start button');
    refs.btnStart.disabled = false;
    // Записуємо дедлайн до зміної “константи”
    TIMER_DEADLINE = selectedDates[0];
  },
};

//! LISTENERS AND START VALUES
refs.btnStart.addEventListener('click', startTimer);
const fp = flatpickr(refs.timeInput, options);
function startTimer() {
  timerId = setInterval(() => {
    const now = Date.now();
    const diff = TIMER_DEADLINE - now;
    // Перевірка коли закінчиться час дедлайну
    if (diff <= 0) {
      // Чистимо інтервал
      clearInterval(timerId);
      // Розблоковуємо інпут і кнопку
      refs.timeInput.disabled = false;
      refs.btnStart.disabled = false;
      // Виводимо повідомлення
      Notiflix.Notify.success('Сongratulations choose a new date');
      return;
    }
    // Деструктурезуємо результат фун-ї обробки часу
    const { days, hours, minutes, seconds } = convertMs(diff);
    refs.daysCounter.textContent = days;
    refs.hoursCounter.textContent = hours;
    refs.minutesCounter.textContent = minutes;
    refs.secondsCounter.textContent = seconds;
    // Блокуємо інпут
    refs.timeInput.disabled = true;
    // Блокуємо кнопку “Start”
    refs.btnStart.disabled = true;
  }, 1000);
}
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


