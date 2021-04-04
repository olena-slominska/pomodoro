//TODOimplement  localStorage to time period settings/color/font for Chrome

const pomodoroButton = document.getElementById("pomodoro");
const shortBreakButton = document.getElementById("shortBreak");
const longBreakButton = document.getElementById("longBreak");

const startButton= document.querySelector('.start-button');
const pauseButton = document.querySelector(".pause-button");
const restartButton = document.querySelector(".restart-button");

const applyBtn = document.querySelector(".apply-btn");
const timeSetting = document.querySelector(".time-setting");
const stopwatch = document.querySelector(".timer-stopwatch");
const colorSet = document.querySelectorAll(".color-radio");
const fontSet = document.querySelectorAll(".font-radio");
const timeModeSet = document.querySelectorAll(".timer-button");
const pomodoroPeriod = document.getElementById("pomodoro-period");
const shortPeriod = document.getElementById("short-period");
const longPeriod = document.getElementById("long-period");
let startTime = 0,
  percent = 0,
  elapsedTime = 0,
  endTime = 0,
  timerInterval;
showButton('START');
applySettings();

pomodoroButton.addEventListener("click", reset);
shortBreakButton.addEventListener("click", reset);
longBreakButton.addEventListener("click", reset);

startButton.addEventListener('click', handleStartButton);

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
  document.documentElement.setAttribute("data-color", colorTheme);
}
function changeFont(font) {
  document.querySelector(".main").style.fontFamily = `${font}`;
}
function setEndTime(pomodoroChoice, shortBreakChoice, longBreakChoice) {
  const timeModeId = [...timeModeSet].filter(
    (timeBtn) => timeBtn.checked === true
  )[0].id;
  const timeModes = {
    pomodoro: pomodoroChoice,
    shortBreak: shortBreakChoice,
    longBreak: longBreakChoice,
  };
  const timeTemp = timeModes[timeModeId];
  endTime = parseInt(timeTemp) * 60000;
}
function handleStartButton() {
  reset();
  applySettings();
  // getTimeMode();
  // showButton('PAUSE');
 
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
    percent = (elapsedTime / endTime) * 100;
    setProgress(percent);
    if (elapsedTime >= endTime) {
      elapsedTime = endTime;
      pause();
      reset();
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
  percent = 0;
  setProgress(0);
  showButton("START");
}
function showButton(buttonKey) {
if (buttonKey === "START") {
  startButton.classList.add('active-action');
  restartButton.classList.remove("active-action");
  pauseButton.classList.remove("active-action");
} else if (buttonKey === "PAUSE") {
  pauseButton.classList.add('active-action');
  restartButton.classList.remove("active-action");
  startButton.classList.remove("active-action");
}else if (buttonKey === "RESTART") {
  restartButton.classList.add('active-action');
  startButton.classList.remove("active-action");
  pauseButton.classList.remove("active-action");
}

   // restartButton.classList.remove("active-action");
  // pauseButton.classList.add("active-action");

}

//circular progress bar:
const circle = document.querySelector(".progressRing-circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = ` ${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;
function setProgress(percent) {
  const offset = circumference * (1 - percent / 100);
  circle.style.strokeDashoffset = offset;
}

//increment/decrement in number inputs:
timeSetting.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrow-up")) {
    e.target.parentElement.previousElementSibling.stepUp(1);
  }
  if (e.target.classList.contains("arrow-down")) {
    e.target.parentElement.previousElementSibling.stepDown(1);
  }
});

//popup with settings:
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
