let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let track_writer = document.querySelector('.track-writer');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let loopIcon = document.querySelector('.fa-repeat')
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isLoop = false;
let updateTimer;

const music_list = [
    {
        img : 'assets/images/tdimgs/cover5.jpg',
        name : 'အရက်ꩻသွတ်ꩻ',
        artist : 'ခွန်ပဒဲကော',
        writer : 'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/tdaudios/music4.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover4.jpg',
        name : 'မွိုးသောက',
        artist : 'ခွန်ချို',
        writer : 'တဲမ်း-ခွန်တင်ဦး',
        music : 'assets/musics/tdaudios/music2.mp3'
    },
    {
        img : 'assets/images/tdimgs/cover3.jpg',
        name : 'ဆာႏပေႏ',
        artist : 'ခွန်ပျူ',
        writer : 'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/tdaudios/music4.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover1.jpg',
        name : 'နင်ႏလိင်ႏလဲဥ်',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer : 'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/tdaudios/music3.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover4.jpg',
        name : 'ယူႏငါႏမွုန်းဒွုမ်',
        artist : 'ခွန်ချို',
        writer : 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
        music : 'assets/musics/tdaudios/music4.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover3.jpg',
        name : 'ဝါးပေꩻဗွါ',
        artist : 'ခွန်ပျူ',
        writer : 'တဲမ်း-ခွန်တင်ဦး',
        music : 'assets/musics/tdaudios/music5.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover1.jpg',
        name : 'တဒွီ',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer : 'တဲမ်း-ခွန်တင်ဦး',
        music : 'assets/musics/tdaudios/music6.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover5.jpg',
        name : 'သꩻရာႏတꩻခါꩻ',
        artist : 'ခွန်ပဒဲကော',
        writer : 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
        music : 'assets/musics/tdaudios/music7.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover4.jpg',
        name : 'သွꩻမူႏ',
        artist : 'ခွန်ချို',
        writer : 'တဲမ်း-ခွန်ပျူ',
        music : 'assets/musics/tdaudios/music8.mp3'
    },
    {
        img : 'assets/images/tdimgs/cover1.jpg',
        name : 'ဒေါ့ꩻနွောဝ်ꩻမွုန်းခွေꩻ',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer : 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
        music : 'assets/musics/tdaudios/music9.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover5.jpg',
        name : 'ယူႏလꩻခွင်ꩻ',
        artist : 'ခွန်ပဒဲကော',
        writer : 'တဲမ်း-ခွန်တင်ဦး',
        music : 'assets/musics/tdaudios/music10.mp3'
    },
    
    {
        img : 'assets/images/tdimgs/cover3.jpg',
        name : 'ဝေးမူႏ',
        artist : 'ခွန်ပျူ',
        writer : 'တဲမ်း-ခွန်ပျူ',
        music : 'assets/musics/tdaudios/music11.mp3'
    },
    
    {
        img : 'assets/images/mimgs/logo.jpg',
        name : 'ဖေႏမွုန်းအသွုမ်ꩻ',
        artist : 'ကာတွန်းစွိုꩻ',
        writer : 'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
        music : 'assets/musics/tdaudios/music12.mp3'
    },
    
];
    
    
   

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    track_writer.textContent = music_list[track_index].writer;
    

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    pauseLoop();
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function playLoop(){
    isLoop = true;
    loopIcon.classList.add('loopActive')
}
function pauseLoop(){
    isLoop = false;
    loopIcon.classList.remove('loopActive');
}
 
function repeatTrack(){
    pauseRandom();
    if(curr_track.loop != true){
        curr_track.loop = true;
        curr_track.play();
        playLoop();
      } else {
        curr_track.loop = false;
        pauseLoop();
    }}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}