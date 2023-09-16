const arrowUpBlueHour = document.getElementById("arrow_blue_up_hour");
const arrowDownBlueHour = document.getElementById("arrow_blue_down_hour");
const arrowUpBlueMinute = document.getElementById("arrow_blue_up_minute");
const arrowDownBlueMinute = document.getElementById("arrow_blue_down_minute");
const blueTriangle = document.getElementById("blueTriangle");
let blueHourDigit = document.getElementById("blue_hour_digits");
let blueMinutesDigit = document.getElementById("blue_mins_digits");
let blueHour = 0;
let blueMinutes = 0;
const blueTimer = document.getElementById("timer1");
const startBlueButton = document.getElementById("blue_start");
const blueBtnStartText = document.getElementById("blueBtnStartText");
const redTimer = document.getElementById("timer2");

const arrowUpRedHour = document.getElementById("arrow_red_up_hour");
const arrowDownRedHour = document.getElementById("arrow_red_down_hour");
const arrowUpRedMinute = document.getElementById("arrow_red_up_minute");
const arrowDownRedMinute = document.getElementById("arrow_red_down_minute");

let savedStartBlue = 0;
let savedStartRed = 0;

const arrowElements = [
  "arrow_blue_up_hour",
  "arrow_blue_down_hour",
  "arrow_blue_up_minute",
  "arrow_blue_down_minute",
  "arrow_red_up_hour",
  "arrow_red_down_hour",
  "arrow_red_up_minute",
  "arrow_red_down_minute",
];
const redHourDigit = document.getElementById("red_hour_digits");
const redMinutesDigit = document.getElementById("red_minute_digits");
const redTriangle = document.getElementById("redTriangle");
const startRedButton = document.getElementById("red_start");
const startRedButtonText = document.getElementById("red_btn_text");
const leftBorder = document.getElementById('leftBorder');
const rightBorder = document.getElementById('rightBorder');
let redHour = 0;
let redMinutes = 0;
let redTotalSeconds = 0;
let redTimerInterval;
let redIsRunning = false;

let blueTotalSeconds = 0;
let blueTimerInterval;
let blueIsRunning = false;

function handleArrowClick(elId) {
  let currentValue;
  switch (elId) {
    case "arrow_blue_up_hour":
      blueHourDigit.textContent = parseInt(blueHourDigit.textContent) + 1;
      blueHour = parseInt(blueHourDigit.textContent);
      resetBlueTimer();
      break;
    case "arrow_blue_down_hour":
      currentValue = parseInt(blueHourDigit.textContent);
      currentValue = currentValue >= 1 ? currentValue - 1 : currentValue;
      blueHourDigit.textContent = currentValue;
      blueHour = currentValue;
      resetBlueTimer();
      break;
    case "arrow_blue_up_minute":
      blueMinutesDigit.textContent = parseInt(blueMinutesDigit.textContent) + 1;
      blueMinutes = parseInt(blueMinutesDigit.textContent);
      resetBlueTimer();
      break;
    case "arrow_blue_down_minute":
      currentValue = parseInt(blueMinutesDigit.textContent);
      currentValue = currentValue >= 1 ? currentValue - 1 : currentValue;
      blueMinutesDigit.textContent = currentValue;
      blueMinutes = currentValue;
      resetBlueTimer();
      break;
    case "arrow_red_up_hour":
      redHourDigit.textContent = parseInt(redHourDigit.textContent) + 1;
      redHour = parseInt(redHourDigit.textContent);
      resetRedTimer();
      break;
    case "arrow_red_down_hour":
      currentValue = parseInt(redHourDigit.textContent);
      currentValue = currentValue >= 1 ? currentValue - 1 : currentValue;
      redHourDigit.textContent = currentValue;
      redHour = currentValue;
      resetRedTimer();
      break;
    case "arrow_red_up_minute":
      redMinutesDigit.textContent = parseInt(redMinutesDigit.textContent) + 1;
      redMinutes = parseInt(redMinutesDigit.textContent);
      resetRedTimer();
      break;
    case "arrow_red_down_minute":
      currentValue = parseInt(redMinutesDigit.textContent);
      currentValue = currentValue >= 1 ? currentValue - 1 : currentValue;
      redMinutesDigit.textContent = currentValue;
      redMinutes = currentValue;
      resetRedTimer();
      break;
    default:
      console.log(`Кликнули на неизвестный элемент`);
  }
}

arrowElements.forEach((elementId) => {
  const arrowElement = document.getElementById(elementId);
  if (arrowElement) {
    arrowElement.addEventListener("click", () => handleArrowClick(elementId));
  }
});

function updateBlueTimer() {
  const hh = String(Math.floor(blueTotalSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((blueTotalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const ss = String(blueTotalSeconds % 60).padStart(2, "0");
  blueTimer.textContent = `${hh}:${mm}:${ss}`;
  // Сохранение текущего значения таймера в локальное хранилище
  localStorage.setItem("blueTimerValue", blueTimer.textContent);
}

function startBlueTimer() {
  if (!blueIsRunning) {
    // Попытка загрузить значение из локального хранилища
    const savedBlueTimerValue = localStorage.getItem("blueTimerValue");
    if (savedBlueTimerValue && savedBlueTimerValue !== "00:00:00") {
      const [hh, mm, ss] = savedBlueTimerValue.split(":");
      blueTotalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
      savedStartBlue = blueTotalSeconds;
    } else {
      // Если значение в локальном хранилище отсутствует или равно "00:00:00", используем значение из blueHour и blueMinutes
      blueTotalSeconds = blueTotalSeconds || blueHour * 3600 + blueMinutes * 60;
      savedStartBlue = blueTotalSeconds;
    }

    blueIsRunning = true;
    blueBtnStartText.textContent = "Pause";
    blueTriangle.setAttribute("src", "assets/icons/pause.svg");
    blueTimerInterval = setInterval(function () {
      const percentage = (blueTotalSeconds / savedStartBlue) * 100;
      leftBorder.style.borderWidth = `${(percentage / 10)}px`;
      if (blueTotalSeconds <= 0) {
        clearInterval(blueTimerInterval);
        blueIsRunning = false;
        blueBtnStartText.textContent = "Start";
        blueTriangle.setAttribute("src", "assets/icons/Group.svg");
      } else {
        blueTotalSeconds--;
        updateBlueTimer();
      }
    }, 1000);
  } else {
    clearInterval(blueTimerInterval);
    blueIsRunning = false;
    blueBtnStartText.textContent = "Resume";
    blueTriangle.setAttribute("src", "assets/icons/Group.svg");
  }
}

function resetBlueTimer() {
  clearInterval(blueTimerInterval);
  blueIsRunning = false;
  blueBtnStartText.textContent = "Start";
  blueTriangle.setAttribute("src", "assets/icons/Group.svg");
  let currentTimer = (blueHour*3600) + (blueMinutes*60);
  blueTotalSeconds = currentTimer;
  savedStartBlue = blueTotalSeconds;
  updateBlueTimer();
}

startBlueButton.addEventListener("click", function () {
  if (blueTotalSeconds === 0 || !blueIsRunning) {
    startBlueTimer();
  } else {
    startBlueTimer();
  }
});

// Загрузка значения таймера при загрузке страницы
window.addEventListener("load", function () {
  const savedBlueTimerValue = localStorage.getItem("blueTimerValue");
  if (savedBlueTimerValue) {
    const [hh, mm, ss] = savedBlueTimerValue.split(":");
    blueTotalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
    updateBlueTimer();
  }
});

// !red

function updateRedTimer() {
  const hh = String(Math.floor(redTotalSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((redTotalSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(redTotalSeconds % 60).padStart(2, "0");
  redTimer.textContent = `${hh}:${mm}:${ss}`;
  // Сохранение текущего значения таймера в локальное хранилище
  localStorage.setItem("redTimerValue", redTimer.textContent);
}

function startRedTimer() {
  if (!redIsRunning) {
    // Попытка загрузить значение из локального хранилища
    const savedRedTimerValue = localStorage.getItem("redTimerValue");

    if (savedRedTimerValue && savedRedTimerValue !== "00:00:00") {
      const [hh, mm, ss] = savedRedTimerValue.split(":");
      redTotalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
      savedStartBlue = blueTotalSeconds;
    } else {
      // Если значение в локальном хранилище отсутствует или равно "00:00:00", используем значение из redHour и redMinutes
      redTotalSeconds = redHour * 3600 + redMinutes * 60;
      savedStartRed = redTotalSeconds;
    }

    redIsRunning = true;
    startRedButtonText.textContent = "Pause";
    redTriangle.setAttribute("src", "assets/icons/pause.svg");
    redTimerInterval = setInterval(function () {
      const percentage = (redTotalSeconds / savedStartRed) * 100;
      rightBorder.style.borderWidth = `${(percentage / 10)}px`;
      if (redTotalSeconds <= 0) {
        clearInterval(redTimerInterval);
        redIsRunning = false;
        startRedButtonText.textContent = "Start";
        redTriangle.setAttribute("src", "assets/icons/Groupred.svg");
      } else {
        redTotalSeconds--;
        updateRedTimer();
      }
    }, 1000);
  } else {
    clearInterval(redTimerInterval);
    redIsRunning = false;
    startRedButtonText.textContent = "Resume";
    redTriangle.setAttribute("src", "assets/icons/Groupred.svg");
  }
}

function resetRedTimer() {
  clearInterval(redTimerInterval);
  redIsRunning = false;
  startRedButtonText.textContent = "Start";
  redTriangle.setAttribute("src", "assets/icons/Groupred.svg");
  let currentTimer2 = (redHour*3600) + (redMinutes*60);
  redTotalSeconds = currentTimer2;
  savedStartRed = redTotalSeconds;
  updateRedTimer();
}

startRedButton.addEventListener("click", function () {
  if (redTotalSeconds === 0 || !redIsRunning) {
    startRedTimer();
  } else {
    startRedTimer();
  }
});

// Загрузка значения таймера при загрузке страницы
window.addEventListener("load", function () {
  const savedRedTimerValue = localStorage.getItem("redTimerValue");
  if (savedRedTimerValue) {
    const [hh, mm, ss] = savedRedTimerValue.split(":");
    redTotalSeconds = parseInt(hh) * 3600 + parseInt(mm) * 60 + parseInt(ss);
    updateRedTimer();
  }
});
