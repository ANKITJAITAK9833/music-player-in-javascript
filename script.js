const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const currentTimeEl = document.getElementById('current-time');
const durationEl  = document.getElementById('current-time');
const playButton = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: "ankit-1",
    displayName: "Electric Chill Machine",
    artist: "Tuffy",
  },
  {
    name: "ankit-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Max",
  },
  {
    name: "ankit-3",
    displayName: "Good Night, Disco Queen",
    artist: "Rio",
  }
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playButton.classList.replace('fa-play','fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

//  Pause
function pauseSong(){
    isPlaying = false;
    playButton.classList.replace("fa-pause", "fa-play");
    playButton.setAttribute("title", "Play");
    music.pause();
}

//  Play or Pause Event listeners
playButton.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()));


function loadSong(song){
 title.textContent = song.displayName;
 artist.textContent = song.artist;
 music.src = `music/${song.name}.mp3`;
 img.src = `img/${song.name}.jpg`;
}

// Update Progress Bar
function updateProgressBar(e){
  if(isPlaying){
    const { duration, currentTime } = e.srcElement;
    //   Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //  Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
    }

    //  Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
      currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
  }
}

// Current Song
let songIndex = 0;

//  Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//  Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On App Load
loadSong(songs[songIndex]);

// Set Progress Bar
function setProgressBar(e){
const width = this.clientWidth;
const clickX = e.offsetX;
const {duration} = music;
music.currentTime = (clickX/width)*duration;
}
// Event Listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);