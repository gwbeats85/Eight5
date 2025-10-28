// Simple music player and menu toggle
const tracks = [
    { src: 'Goodwill-NewLife.mp3', title: 'New Life' },
    { src: 'Goodwill-HeyHey.mp3', title: 'Hey Hey' }
];
let currentIndex = 0;
const audio = new Audio();

// Menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
        }
    });
}

// Music player elements
const trackTitleEl = document.getElementById('track-title');
const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    if (trackTitleEl) trackTitleEl.textContent = track.title;
}

function playTrack() {
    audio.play();
    if (playPauseBtn) playPauseBtn.textContent = '❚❚';
}

function pauseTrack() {
    audio.pause();
    if (playPauseBtn) playPauseBtn.textContent = '▶';
}

if (prevBtn && playPauseBtn && nextBtn && trackTitleEl) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentIndex);
        playTrack();
    });
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % tracks.length;
        loadTrack(currentIndex);
        playTrack();
    });
    audio.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % tracks.length;
        loadTrack(currentIndex);
        playTrack();
    });
    // initialize
    loadTrack(currentIndex);
}

// Starfield animation
(function () {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 200;
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width
            });
        }
    }
    function updateStars() {
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            star.z -= 2;
            if (star.z <= 0) {
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
                star.z = canvas.width;
            }
        }
    }
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            const k = 256 / star.z;
            const x = (star.x - canvas.width / 2) * k + canvas.width / 2;
            const y = (star.y - canvas.height / 2) * k + canvas.height / 2;
            const size = (1 - star.z / canvas.width) * 2;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(x, y, size, size);
        }
    }
    function animate() {
        updateStars();
        drawStars();
        requestAnimationFrame(animate);
    }
    initStars();
    animate();
})();
