import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btn = document.querySelector('button');
const dateTimerPicker = document.querySelector('#datetime-picker');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      iziToast.error({
        message: 'Please choose a date in the future',
        color: '#ef4040',
        messageColor: '#ffffff',
        messageSize: '16',
        position: 'topRight',
      });
      btn.disabled = true;

      return;
    }
    btn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

const calendar = flatpickr('#datetime-picker', options);
btn.addEventListener('click', startTimer);
function startTimer() {
  btn.disabled = true;
  dateTimerPicker.disabled = true;
  const intervalId = setInterval(() => {
    const dateNow = Date.now();
    const differenceTime = userSelectedDate.getTime() - dateNow;
    if (differenceTime <= 0) {
      clearInterval(intervalId);
      dateTimerPicker.disabled = false;
      return;
    }

    const convertTime = convertMs(differenceTime);
    const day = document.querySelector('[data-days]');
    const hour = document.querySelector('[data-hours]');
    const minute = document.querySelector('[data-minutes]');
    const second = document.querySelector('[data-seconds]');

    day.innerHTML = addLeadingZero(convertTime.days);
    hour.innerHTML = addLeadingZero(convertTime.hours);
    minute.innerHTML = addLeadingZero(convertTime.minutes);
    second.innerHTML = addLeadingZero(convertTime.seconds);
  });
}

function addLeadingZero(value) {
  const stringValue = String(value);

  if (stringValue.length < 2) {
    return stringValue.padStart(2, '0');
  }
  return stringValue;
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
