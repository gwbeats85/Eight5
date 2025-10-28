const tracks = [
  { src: "Goodwill-NewLife.mp3", title: "New Life" },
  { src: "Goodwill-HeyHey.mp3", title: "Hey Hey" },
];

let currentIndex = 0;
const audio = new Audio();
const trackTitle = document.getElementById("track-title");
const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  audio.load();
}

function playTrack() {
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function pauseTrack() {
  audio.pause();
  playPauseBtn.textContent = "▶";
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadTrack(currentIndex);
