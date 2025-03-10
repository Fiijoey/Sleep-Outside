const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');

let timeLeft = 10; // Default starting time
let intervalId; // Variable to store the interval ID
let isPaused = false; // Boolean to track pause/resume state

// Start button functionality
startButton.addEventListener('click', () => {
  if (!intervalId) { // Only start if no interval is running
    countdownDisplay.textContent = timeLeft; // Display initial time

    intervalId = setInterval(() => {
      if (!isPaused && timeLeft >= 0) {
        countdownDisplay.textContent = timeLeft; // Update countdown
        timeLeft--;
      } else if (!isPaused && timeLeft < 0) {
        clearInterval(intervalId); // Stop countdown when time is up
        intervalId = null; // Reset interval ID
        countdownDisplay.textContent = "Time's up!";
      }
    }, 1000); // Run every second
  }
});

// Pause/Resume button functionality
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused; // Toggle pause state
  pauseButton.textContent = isPaused ? "Resume" : "Pause"; // Update button text
});

// Stop button functionality
pauseButton.addEventListener('dblclick', () => {
  clearInterval(intervalId); // Clear the countdown
  intervalId = null; // Reset interval ID
  timeLeft = 10; // Reset time to default
  isPaused = false; // Reset pause state
  countdownDisplay.textContent = ""; // Clear the display
  pauseButton.textContent = "Pause"; // Reset button text
});
