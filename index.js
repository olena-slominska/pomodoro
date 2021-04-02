//TODOimplement localStorage to fonts, time period settings and colors

const pomodoroButton = document.getElementById("pomodoro");
const shortBreakButton = document.getElementById("shortBreak");
const longBreakButton = document.getElementById("longBreak");
const pauseButton = document.querySelector(".pause-button");
const restartButton = document.querySelector(".restart-button");
const applyBtn = document.querySelector(".apply-btn");

const stopwatch = document.querySelector(".timer-stopwatch");
const colorSet = document.querySelectorAll(".color-radio");
const fontSet = document.querySelectorAll(".font-radio");
const timeModeSet = document.querySelectorAll(".timer-button");
const pomodoroPeriod = document.getElementById("pomodoro-period");
const shortPeriod = document.getElementById("short-period");
const longPeriod = document.getElementById("long-period");
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let endTime = 0;

pomodoroButton.addEventListener("click", handleStartButton);
shortBreakButton.addEventListener("click", handleStartButton);
longBreakButton.addEventListener("click", handleStartButton);

pauseButton.addEventListener("click", pause);
restartButton.addEventListener("click", start);

applyBtn.addEventListener("click", applySettings);

function applySettings() {
  const colorChoice = [...colorSet].filter(
    (colorBtn) => colorBtn.checked === true
  )[0].id;
  const fontChoice = [...fontSet].filter(
    (fontBtn) => fontBtn.checked === true
  )[0].id;
  const pomodoroChoice = pomodoroPeriod.value;
  const shortBreakChoice = shortPeriod.value;
  const longBreakChoice = longPeriod.value;

  const fonts = {
    font1: '"Kumbh Sans", sans-serif',
    font2: ' "Space Mono", monospace',
    font3: '"Roboto Slab", serif',
  };
  const font = fonts[fontChoice];
  changeColor(colorChoice);
  changeFont(font);
  setEndTime(pomodoroChoice, shortBreakChoice, longBreakChoice);
}

function changeColor(colorTheme) {
  document.documentElement.setAttribute("data-color", colorTheme || "coral");
}
function changeFont(font) {
  document.querySelector(".main").style.fontFamily = `${font}`;
}
function setEndTime(pomodoroChoice, shortBreakChoice, longBreakChoice) {
  const timeModeId = [...timeModeSet].filter(
    (timeBtn) => timeBtn.checked === true
  )[0].id;
  const timeModes = {
    'pomodoro': pomodoroChoice,
    'shortBreak': shortBreakChoice,
    'longBreak': longBreakChoice
  }
  const timeTemp = timeModes[timeModeId];
  endTime = parseInt(timeTemp)*60000;
}

function handleStartButton(e) {
  reset();
  applySettings();
  restartButton.classList.remove("active-action");
  pauseButton.classList.add("active-action");
  start();
}

function timeToString(time) {
  let diffInMin = time / 60000;
  let mm = Math.floor(diffInMin);
  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  return `${formattedMM}:${formattedSS}`;
}

function print(txt) {
  stopwatch.innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime >= endTime) {
      elapsedTime = endTime;
      stop();
    }
    print(timeToString(elapsedTime));
  }, 1000);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timerInterval);
  showButton("RESTART");
}

function reset() {
  clearInterval(timerInterval);
  print("00:00");
  elapsedTime = 0;
  showButton("RESTART");
}
function showButton(buttonKey) {
  const buttonToShow = buttonKey === "RESTART" ? restartButton : pauseButton;
  const buttonToHide = buttonKey === "RESTART" ? pauseButton : restartButton;
  buttonToShow.style.display = "flex";
  buttonToHide.style.display = "none";
}

const openEl = document.querySelector("[data-open]");
const closeEl = document.querySelector("[data-close]");
openEl.addEventListener("click", () => {
  document.getElementById("modal").classList.add("is-visible");
});
closeEl.addEventListener("click", () => {
  document.querySelector(".modal.is-visible").classList.remove("is-visible");
});
document.addEventListener("click", (e) => {
  if (e.target == applyBtn) {
    document.querySelector(".modal.is-visible").classList.remove("is-visible");
  }
});
