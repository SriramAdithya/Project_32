const image = document.querySelector('#image');
const animateBtn = document.querySelector('#btn__animate');
const time = document.querySelector('#time');
let interval;

/* Display Time */
function displayTime() {
  const hour = new Date().getHours();
  const mins = new Date().getMinutes();
  const prefix_0 = mins <= 9 ? `0${mins}` : mins;
  time.textContent = `Time: ${hour}:${prefix_0} ${hour <= 12 ? `AM` : `PM`}`;
}

displayTime();
setInterval(displayTime, 1000);

/* Display Image */

// prettier-ignore
const imageSource = src => image.src = src;

async function getHour() {
  try {
    const request = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    const { datetime } = await request.json();
    const hour = datetime.slice(11, 13);

    if (hour <= 06) imageSource(`./images/sunrise2.png`);
    else if (hour <= 10) imageSource(`./images/sunrise4.png`);
    else if (hour <= 14) imageSource(`./images/sunrise5.png`);
    else if (hour <= 17) imageSource(`./images/sunrise6.png`);
    else if (hour <= 19) imageSource(`./images/sunrise7.png`);
    else if (hour <= 21) imageSource(`./images/sunrise9.png`);
    else if (hour === 22) imageSource(`./images/sunrise10.png`);
    else imageSource(`./images/sunrise11.png`);
    /* ------------------------------------------------------------- */
  } catch {
    setTimeout(function () {
      getHour();
    }, 2000);
  }
}

getHour();

/* Animate */

function animate() {
  let currImg = 0;
  if (interval) clearInterval(interval);
  interval = setInterval(function () {
    currImg !== 11 ? imageSource(`./images/sunrise${++currImg}.png`) : clearInterval(interval);
  }, 1000);
}

animateBtn.addEventListener('click', animate);
