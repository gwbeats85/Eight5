console.log("Eight5 Visualizer loaded");

window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audioPlayer");
  const canvas = document.getElementById("visualizer");
  if (!audio || !canvas) {
    console.error("Audio or canvas element missing.");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 150;

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const src = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  src.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 150;
  }
  window.addEventListener("resize", resizeCanvas);

  function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2;
      const red = barHeight + 100;
      const green = 50 + (i / bufferLength) * 150;
      const blue = 200;
      ctx.fillStyle = `rgb(${red},${green},${blue})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }

  audio.addEventListener("play", () => {
    if (audioCtx.state === "suspended") audioCtx.resume();
    renderFrame();
  });
});
const trackList = document.getElementById("trackList");
trackList.addEventListener("change", () => {
  const newTrack = trackList.value;
  audio.src = newTrack;
  audio.play();
});
const trackList = document.getElementById("trackList");
trackList.addEventListener("change", () => {
  const newTrack = trackList.value;
  audio.src = newTrack;
  audio.play();
});

