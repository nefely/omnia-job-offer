const audio = new Audio("audio/audio.mp3"); 
const playBtn = document.querySelector(".play-button button");
const playIcon = playBtn.querySelector(".fa-play");
const pauseIcon = playBtn.querySelector(".fa-pause");
const progressButtons = document.querySelectorAll(".progress-bar button");

let isPlaying = false;
let progressInterval = null;

function updateProgressBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const totalBars = progressButtons.length;
  const activeBars = Math.floor((currentTime / duration) * totalBars);

  progressButtons.forEach((btn, index) => {
    if (index < activeBars) {
      btn.classList.add("passed");
    } else {
      btn.classList.remove("passed");
    }
  });
}

function startProgressLoop() {
  progressInterval = setInterval(() => {
    updateProgressBar();
  }, 100);
}

function stopProgressLoop() {
  clearInterval(progressInterval);
  progressInterval = null;
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    stopProgressLoop();
    isPlaying = false;
    playIcon.style.display = "inline-block";
    pauseIcon.style.display = "none";
  } else {
    audio.play();
    startProgressLoop();
    isPlaying = true;
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline-block";
  }
});

audio.addEventListener("ended", () => {
  isPlaying = false;
  stopProgressLoop();
  playIcon.style.display = "inline-block";
  pauseIcon.style.display = "none";
  progressButtons.forEach(btn => btn.classList.remove("passed"));
});

pauseIcon.style.display = "none";

progressButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const duration = audio.duration;
      const totalBars = progressButtons.length;
      const newTime = (index / totalBars) * duration;
      audio.currentTime = newTime;
      updateProgressBar();
    });
});