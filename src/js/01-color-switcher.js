const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);



function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
        
  };

 function colorRandomizer() {
    refs.body.style.backgroundColor = getRandomHexColor();
 }

function startChangeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
    colorSwitcherId = setInterval(colorRandomizer, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};


function stopChangeColor() {
    clearInterval(colorSwitcherId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
}















// const colorSwitcherId = setInterval(startChangeColor, 10000);

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
//   };

//   function startChangeColor() {
//     refs.body.style.backgroundColor = getRandomHexColor();
//     refs.startBtn.disabled = true;
//     refs.stopBtn.disabled = false;


//   };

//   function stopChangeColor() {
//     clearInterval(colorSwitcherId);
//     refs.startBtn.disabled = false;
//     refs.stopBtn.disabled = true;

//   };

