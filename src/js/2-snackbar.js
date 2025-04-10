import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromis);
function createPromis(evt) {
  evt.preventDefault();
  const elements = evt.target.elements;
  const inputValueDelay = elements.delay.value;

  const inputValueState = elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputValueState === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${inputValueDelay}ms`);
      } else {
        reject(`❌ Rejected promise in ${inputValueDelay}ms`);
      }
    }, inputValueDelay);
  });
  promise
    .then(value => {
      iziToast.show({
        message: value,
        color: '#59a10d',
        messageColor: '#ffffff',
        messageSize: '16',
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: error,
        color: '#ef4040',
        messageColor: '#ffffff',
        messageSize: '16',
        position: 'topRight',
      });
    });
  form.reset();
}
