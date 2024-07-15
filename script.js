const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackCover = document.getElementById('track-cover');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const playlistEl = document.getElementById('playlist');

const tracks = [
  {
    title: 'Better Day',
    artist: 'penguinmusic',
    src: 'musics/better-day.mp3',
    cover: 'musics/image1.jpg'
  },
  {
    title: 'Inspiring',
    artist: 'Soundbay',
    src: 'musics/inspiring.mp3',
    cover: 'musics/image2.jpg'
  },
  {
    title: 'Perfect Beauty',
    artist: 'Good_B_Music',
    src: 'musics/perfect-beauty.mp3',
    cover: 'musics/image3.jpg'
  },
  {
    title: 'Amalgam',
    artist: 'music by Amalgam',
    src: 'musics/amalgam.mp3',
    cover: 'musics/image4.jpg'
  },
  {
    title: 'Flow',
    artist: 'music by flow',
    src: 'musics/flow.mp3',
    cover: 'musics/image5.jpg'
  },
  {
    title: 'For her Chill',
    artist: 'For Her',
    src: 'musics/for her chill.mp3',
    cover: 'musics/image6.jpg'
  }
];

let currentTrackIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  trackCover.src = track.cover;
  audioPlayer.src = track.src;
  audioPlayer.load();
  updatePlaylistHighlight();
}

function playPauseTrack() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function rewindTrack() {
  audioPlayer.currentTime -= 10;
}

function forwardTrack() {
  audioPlayer.currentTime += 10;
}

function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
}

function setProgress(e) {
  const newTime = (e.target.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

function setVolume(e) {
  audioPlayer.volume = e.target.value / 100;
}

function createPlaylist() {
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = track.title;
    li.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    playlistEl.appendChild(li);
  });
}

function updatePlaylistHighlight() {
  const playlistItems = playlistEl.querySelectorAll('li');
  playlistItems.forEach((item, index) => {
    item.classList.remove('active');
    if (index === currentTrackIndex) {
      item.classList.add('active');
    }
  });
}

audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);

playPauseBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
rewindBtn.addEventListener('click', rewindTrack);
forwardBtn.addEventListener('click', forwardTrack);

loadTrack(currentTrackIndex);
createPlaylist();
