import Notiflix from 'notiflix';
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  promise
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`:white_check_mark: Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`:x: Rejected promise ${position} in ${delay}ms`);
  });
}
const formEl = document.querySelector(`.form`);
formEl.addEventListener("submit", onBtnSubmitClick);
function onBtnSubmitClick(evt){
  evt.preventDefault();
  const {
    elements: { delay, step, amount }
  } = evt.currentTarget;
  let firstDelay = Number(evt.currentTarget.delay.value);
  const stepDelay = Number(evt.currentTarget.step.value);
  const amountEl = Number(evt.currentTarget.amount.value);
  for(let i = 0; i < amountEl; i += 1){
    createPromise(i, firstDelay);
    firstDelay += stepDelay;
  };
};
