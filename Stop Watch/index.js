let startTime = null;
let timeUptilNow = null;
let running = false;
let historyTime = [];
let timerIncreaseFunction = null;

const timerPara = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 10);
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return hours + " : " + minutes + " : " + seconds + " . " + milliseconds;
}
timerPara.innerHTML = msToTime(0);

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

resetBtn.disabled = true;
pauseBtn.disabled = true;

function startTimer() {
    if (running === false) {
        running = true;
        startTime = new Date();

        timerPara.innerHTML = `<h1>${msToTime(new Date() - startTime)}</h1>`;
        timerIncreaseFunction = setInterval(() => {
            timerPara.innerHTML = `<h1> ${msToTime(new Date() - startTime)} </h1>`
        });


        pauseBtn.innerText = "Pause";
        startBtn.disabled = true;
        resetBtn.disabled = false;
        pauseBtn.disabled = false;
    }
}

function pauseTimer() {
    if (running === true) {
        running = false;
        timeUptilNow = timeUptilNow + (new Date() - startTime);
        startTime = null;

        pauseBtn.innerText = "Play";

        clearInterval(timerIncreaseFunction);
    }
    else {
        running = true;
        startTime = new Date();

        pauseBtn.innerText = "Pause";

        timerIncreaseFunction = setInterval(() => {
            timerPara.innerHTML = `<h1>${msToTime(timeUptilNow + (new Date() - startTime))}</h1>`
        });
    }
}

function resetTimer() {
    if (running === true) {
        const timer = msToTime(timeUptilNow + (new Date() - startTime));
        historyTime.push(timer);

        timeUptilNow = null;
        startTime = null;
        running = false;
        clearInterval(timerIncreaseFunction);
        timerPara.innerText = msToTime(0);
        createHistoryList(timer);

        startBtn.disabled = false;
        resetBtn.disabled = true;
        pauseBtn.disabled = true;
    }
}

function createHistoryList(timer) {
    const historyPara = document.getElementById("history");

    const list = document.createElement("li");
    list.className = "list-group-item text-muted";
    list.innerText = timer;

    historyPara.insertBefore(list, historyPara.firstChild);
}