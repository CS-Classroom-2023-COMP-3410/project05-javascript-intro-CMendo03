const clockElement = document.getElementById('clock');
const toggleFormatButton = document.getElementById('toggleFormat');
const colorPicker = document.getElementById('colorPicker');
const fontSizeInput = document.getElementById('fontSize');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarm');
const alarmMessage = document.getElementById('alarmMessage');

let is24HourFormat = false;
let alarmTime = null;

// Load preferences from localStorage
function loadPreferences() {
    const savedColor = localStorage.getItem('clockColor');
    const savedFontSize = localStorage.getItem('clockFontSize');
    const savedFormat = localStorage.getItem('clockFormat');
    const savedAlarm = localStorage.getItem('alarmTime');

    if (savedColor) {
        clockElement.style.color = savedColor;
        colorPicker.value = savedColor;
    }

    if (savedFontSize) {
        clockElement.style.fontSize = `${savedFontSize}px`;
        fontSizeInput.value = savedFontSize;
    }

    if (savedFormat) {
        is24HourFormat = savedFormat === '24';
        updateFormatButton();
    }

    if (savedAlarm) {
        alarmTime = savedAlarm;
        alarmTimeInput.value = savedAlarm;
    }
}

// Update clock time
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (!is24HourFormat) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${period}`;
    } else {
        clockElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    // Check alarm
    const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    if (alarmTime === currentTime) {
        alarmMessage.textContent = 'Alarm! Time to wake up!';
        setTimeout(() => (alarmMessage.textContent = ''), 5000); // Clear message after 5 seconds
    }
}

// Helper function to add leading zeros
function pad(number) {
    return number.toString().padStart(2, '0');
}

// Toggle time format
function toggleFormat() {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem('clockFormat', is24HourFormat ? '24' : '12');
    updateFormatButton();
    updateClock();
}

function updateFormatButton() {
    toggleFormatButton.textContent = is24HourFormat ? 'Switch to 12-Hour' : 'Switch to 24-Hour';
}

// Change clock color
function changeColor(event) {
    const color = event.target.value;
    clockElement.style.color = color;
    localStorage.setItem('clockColor', color);
}

// Change font size
function changeFontSize(event) {
    const fontSize = event.target.value;
    clockElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('clockFontSize', fontSize);
}

// Set alarm
function setAlarm() {
    alarmTime = alarmTimeInput.value;
    localStorage.setItem('alarmTime', alarmTime);
    alarmMessage.textContent = `Alarm set for ${alarmTime}`;
    setTimeout(() => (alarmMessage.textContent = ''), 3000); // Clear message after 3 seconds
}

// Event listeners
toggleFormatButton.addEventListener('click', toggleFormat);
colorPicker.addEventListener('input', changeColor);
fontSizeInput.addEventListener('input', changeFontSize);
setAlarmButton.addEventListener('click', setAlarm);

// Initialize clock
loadPreferences();
setInterval(updateClock, 1000);
updateClock();
