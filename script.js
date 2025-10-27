console.log("Eight5 is alive.");
const audio = document.getElementById('audioPlayer');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 150;

const audioCtx = new AudioContext();
const src = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();

src.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function renderFrame() {
  requestAnimationFrame(renderFrame);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 1.5;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = `rgb(${barHeight + 100},50,200)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

audio.onplay = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  renderFrame();
};
