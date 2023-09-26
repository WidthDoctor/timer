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
const leftBorder = document.getElementById("leftBorder");
const rightBorder = document.getElementById("rightBorder");
let redHour = 0;
let redMinutes = 0;
let redTotalSeconds = 0;
let redTimerInterval;
let redIsRunning = false;

let blueTotalSeconds = 0;
let blueTimerInterval;
let blueIsRunning = false;

let touchStartTimestamp;
let touchInterval;

function handleTouchStart(elId, event) {
  event.preventDefault(); // Предотвращаем вызов контекстного меню
  touchStartTimestamp = event.timeStamp;
  touchInterval = setInterval(() => {
    // Обработка удержания стрелки здесь
    handleArrowClick(elId);
  }, 50); // Интервал для быстрого увеличения/уменьшения (в миллисекундах)
}

function handleTouchEnd(elId, event) {
  clearInterval(touchInterval); // Очищаем интервал при отпускании стрелки
  const touchEndTimestamp = event.timeStamp;

  // Если время удержания было коротким, то считаем это кликом
  if (touchEndTimestamp - touchStartTimestamp < 50) {
    handleArrowClick(elId);
  }
}

arrowElements.forEach((elementId) => {
  const arrowElement = document.getElementById(elementId);
  if (arrowElement) {
    arrowElement.addEventListener("touchstart", (event) =>
      handleTouchStart(elementId, event)
    );
    arrowElement.addEventListener("click", () => handleArrowClick(elementId));
    arrowElement.addEventListener("touchend", (event) =>
      handleTouchEnd(elementId, event)
    );
  }
});

function handleArrowClick(elId) {
  let currentValue;
  const currentBlueHour = parseInt(blueHourDigit.textContent);
  const currentBlueMins = parseInt(blueMinutesDigit.textContent);
const currentRedHour = parseInt(redHourDigit.textContent)
const currentRedMins = parseInt(redMinutesDigit.textContent);
  switch (elId) {
    case "arrow_blue_up_hour":
      if (currentBlueHour === 99) {
        blueHour = 0;
        blueHourDigit.textContent = "0";
      } else {
        blueHourDigit.textContent = (currentBlueHour + 1)
          .toString();
        blueHour = currentBlueHour + 1;
      }
      resetBlueTimer();
      break;
    case "arrow_blue_down_hour":
      if (currentBlueHour === 0) {
        blueHour = 99;
        blueHourDigit.textContent = "99";
      } else {
        blueHourDigit.textContent = (currentBlueHour - 1)
          .toString();
        blueHour = currentBlueHour - 1;
      }
      resetBlueTimer();
      break;
    case "arrow_blue_up_minute":
      if (currentBlueMins === 59) {
        blueMinutes = 0;
        blueMinutesDigit.textContent = "0";
      } else {
        blueMinutesDigit.textContent = (currentBlueMins + 1)
        .toString();
        blueMinutes = currentBlueMins + 1;
        resetBlueTimer();
      }
      break;
    case "arrow_blue_down_minute":
      if (currentBlueMins === 0) {
        blueMinutes = 59;
        blueMinutesDigit.textContent = "59";
      } else {
        blueMinutesDigit.textContent = (currentBlueMins - 1)
        .toString();
        blueMinutes = currentBlueMins - 1;
        resetBlueTimer();
      }
      break;
    case "arrow_red_up_hour":
      if (currentRedHour === 99) {
        redHour = 0;
        redHourDigit.textContent = "0";
      } else {
        redHourDigit.textContent = (currentRedHour + 1)
          .toString();
        redHour = currentRedHour + 1;
      }
      resetRedTimer();
      break;
    case "arrow_red_down_hour":
      if (currentRedHour === 0) {
        redHour = 99;
        redHourDigit.textContent = "99";
      } else {
        redHourDigit.textContent = (currentRedHour - 1)
          .toString();
        redHour = currentRedHour - 1;
      }
      resetRedTimer();
      break;
    case "arrow_red_up_minute":
      if (currentRedMins === 59) {
        redMinutes = 0;
        redMinutesDigit.textContent = "0";
      } else {
        redMinutesDigit.textContent = (currentRedMins + 1)
          .toString();
          redMinutes = currentRedMins + 1;
      }
      resetRedTimer();
      break;
    case "arrow_red_down_minute":
      if (currentRedMins === 0) {
        redMinutes = 59;
        redMinutesDigit.textContent = "59";
      } else {
        redMinutesDigit.textContent = (currentRedMins - 1)
          .toString();
          redMinutes = currentRedMins - 1;
      }
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
      leftBorder.style.borderWidth = `${percentage / 10}px`;
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
  let currentTimer = blueHour * 3600 + blueMinutes * 60;
  blueTotalSeconds = currentTimer;
  savedStartBlue = blueTotalSeconds;
  updateBlueTimer();
}

startBlueButton.addEventListener("click", function (event) {
   event.preventDefault();
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
      rightBorder.style.borderWidth = `${percentage / 10}px`;
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
  let currentTimer2 = redHour * 3600 + redMinutes * 60;
  redTotalSeconds = currentTimer2;
  savedStartRed = redTotalSeconds;
  updateRedTimer();
}

startRedButton.addEventListener("click", function (event) {
  event.preventDefault();
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
