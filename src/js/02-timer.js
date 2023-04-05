import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    timer: document.querySelector('.timer'),
    startBtn: document.querySelector('[data-start]'),
    daysOutput: document.querySelector('[data-days'),
    hoursOutput: document.querySelector('[data-hours'),
    minutesOutput: document.querySelector('[data-minutes'),
    secondsOutput: document.querySelector('[data-seconds'),
};


let TIMER_DEADLINE = null;
refs.startBtn.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if(selectedDates[0] < options.defaultDate) {
        return Notiflix.Notify.failure('Please chose the date in a future')
      }

      Notiflix.Notify.info('Date selected, please press the start button');

      refs.startBtn.disabled = false;

      TIMER_DEADLINE = selectedDates[0];
    },
  };

const fp = flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', setUpTimerValues);


function setUpTimerValues() {
  const chossenDate = fp.selectedDates[0];
  const todayDate = options.defaultDate;
  const diff = chossenDate - todayDate;
  convertMs(diff);
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

refs.daysOutput.textContent = days;
refs.hoursOutput.textContent = hours;
refs.minutesOutput.textContent = minutes;
refs.secondsOutput.textContent = seconds;

return { days, hours, minutes, seconds };

}

