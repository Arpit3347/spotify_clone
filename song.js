
// NOTE: = es js file ki help se songs ek array mein store hogaye taki deployment mein problem na ho because fetch wala method is not working for deployment 



// ======================================================
// MUSIC PLAYER
// ======================================================

let currentSong = new Audio();


// ======================================================
// MANUALLY ADD SONGS HERE
// ======================================================
// IMPORTANT:
// Every path must exactly match the filename inside
// your "songs" folder.
//
// You DON'T need fetch() or songs.json anymore.
// ======================================================

let songs = [

    "./songs/505.mp3",
    "./songs/Aam-ke-swad.mp3",
    "./songs/akullloveu.mp3",
    "./songs/Alan_WalkerFaded.mp3",
    "./songs/barbaad.mp3",
    "./songs/Beautynbea.mp3",
    "./songs/B-min.mp3",
    "./songs/broklynblodpop.mp3",
    "./songs/Brownrang.mp3",
    "./songs/cn'tfall-inlove.mp3",

    "./songs/copines.mp3",
    "./songs/dhun.mp3",
    "./songs/found-U.mp3",
    "./songs/Gehrahua.mp3",
    "./songs/gucco.mp3",
    "./songs/gundagarh.mp3",
    "./songs/honathapyar.mp3",
    "./songs/iloveu.mp3",
    "./songs/ishqbull.mp3",
    "./songs/Jaatyari.mp3",

    "./songs/kalekagaz.mp3",
    "./songs/LeMeLoveU.mp3",
    "./songs/LostSoul.mp3",
    "./songs/L-PxEcstacy.mp3",
    "./songs/nevada.mp3",
    "./songs/Nhilagta-dil.mp3",
    "./songs/old-house.mp3",
    "./songs/On_On.mp3",
    "./songs/outside.mp3",
    "./songs/pehlidafa.mp3",

    "./songs/perfect.mp3",
    "./songs/Stereo-Love.mp3",
    "./songs/TeraNaamDu.mp3",
    "./songs/Tuchahiye.mp3",
    "./songs/Tu-pyar.mp3",
    "./songs/what-it-is.mp3"

];


// ======================================================
// SONG NAMES
// ======================================================
// Automatically remove "./songs/" and ".mp3"
// ======================================================

let songNames = songs.map((song) => {

    return decodeURIComponent(
        song.split("/").pop().replace(".mp3", "")
    );

});


// ======================================================
// GET SONG LIST <UL>
// ======================================================

let songUl = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];


// ======================================================
// CREATE SONG CARDS
// ======================================================

for (let i = 0; i < songNames.length; i++) {

    songUl.innerHTML += `
        <li>

            <img class="invert" src="music.svg" alt="">

            <div class="info">

                <div>${songNames[i]}</div>

                <div>Song-artist</div>

            </div>

            <div class="playbar">

                Play

                <img 
                    class="musicplayicon" 
                    src="playbutton.svg" 
                    alt=""
                >

            </div>

        </li>
    `;
}


// ======================================================
// GET ALL SONG <li>
// ======================================================

let songList = Array.from(
    document
        .querySelector(".songlist")
        .getElementsByTagName("li")
);


// ======================================================
// CURRENT SONG INDEX
// ======================================================

let currentIndex = 0;


// ======================================================
// AMBIENT BACKGROUND
// ======================================================

let ambientBg = document.querySelector(".ambient-bg");


// ======================================================
// RADIO SVG
// ======================================================

let radioSvg = document.querySelector(".radio-svg");


// ======================================================
// SONG INFO ON PLAYER
// ======================================================

let songInfo = document.querySelector(".actualname");


// ======================================================
// CHANGE BACKGROUND
// ======================================================

function changeBackground() {

    let fileName = songNames[currentIndex];

    ambientBg.style.backgroundImage =
        `url("backgrounds/${fileName}.jpg")`;

    ambientBg.style.opacity = "0.8";
}


// ======================================================
// SONG LIST CLICK
// ======================================================

songList.forEach((li, index) => {

    li.addEventListener("click", () => {

        // Save clicked song index
        currentIndex = index;


        // Set song
        currentSong.src = songs[currentIndex];


        // Play song
        currentSong.play();


        // Rotate radio
        radioSvg.classList.add("playing");


        // Show song name
        songInfo.innerHTML =
            songNames[currentIndex] + ".mp3";


        // Change background
        changeBackground();


        // Activate ambient background
        document
            .querySelector(".right")
            .classList.add("ambient-active");

    });

});


// ======================================================
// PLAY / PAUSE BUTTON
// ======================================================

let playbutton = document.querySelector(".playmusic");


playbutton.addEventListener("click", () => {

    // If song is paused
    if (currentSong.paused) {

        currentSong.play();

        playbutton.src = "pause.svg";


        // Rotate radio
        radioSvg.classList.add("playing");


        // Show background
        changeBackground();

        ambientBg.style.opacity = "0.8";


        // Activate right background
        document
            .querySelector(".right")
            .classList.add("ambient-active");

    }

    // If song is playing
    else {

        currentSong.pause();

        playbutton.src = "music.svg";


        // Stop radio rotation
        radioSvg.classList.remove("playing");


        // Hide ambient background
        ambientBg.style.opacity = "0";


        // Remove ambient background from right
        document
            .querySelector(".right")
            .classList.remove("ambient-active");

    }

});


// ======================================================
// NEXT BUTTON
// ======================================================

let nextButton = document.querySelector(".nextmusic");


nextButton.addEventListener("click", () => {

    // Move to next song
    currentIndex++;


    // If last song → go to first song
    if (currentIndex >= songs.length) {

        currentIndex = 0;

    }


    // Set next song
    currentSong.src = songs[currentIndex];


    // Play
    currentSong.play();


    // Rotate radio
    radioSvg.classList.add("playing");


    // Change song name
    songInfo.innerHTML =
        songNames[currentIndex] + ".mp3";


    // Change background
    changeBackground();


    // Activate ambient background
    document
        .querySelector(".right")
        .classList.add("ambient-active");

});


// ======================================================
// PREVIOUS / BACK BUTTON
// ======================================================

let previousButton = document.querySelector(".backmusic");


previousButton.addEventListener("click", () => {

    // Move to previous song
    currentIndex--;


    // If first song → go to last song
    if (currentIndex < 0) {

        currentIndex = songs.length - 1;

    }


    // Set previous song
    currentSong.src = songs[currentIndex];


    // Play
    currentSong.play();


    // Rotate radio
    radioSvg.classList.add("playing");


    // Change song name
    songInfo.innerHTML =
        songNames[currentIndex] + ".mp3";


    // Change background
    changeBackground();


    // Activate ambient background
    document
        .querySelector(".right")
        .classList.add("ambient-active");

});


// ======================================================
// SEEKBAR + CIRCLE
// ======================================================

let seekbar = document.querySelector(".seekbar");

let circle = document.querySelector(".circle");


currentSong.addEventListener("timeupdate", () => {

    // Prevent NaN before song duration loads
    if (!currentSong.duration) {
        return;
    }


    let percentage =
        (currentSong.currentTime / currentSong.duration) * 100;


    circle.style.left = percentage + "%";

});


// ======================================================
// CLICK ON SEEKBAR
// ======================================================

seekbar.addEventListener("click", (e) => {

    let percent =
        e.offsetX / seekbar.offsetWidth;


    currentSong.currentTime =
        percent * currentSong.duration;

});


// ======================================================
// HAMBURGER
// ======================================================

let hamburger = document.querySelector(".hamburger");


hamburger.addEventListener("click", () => {

    document.querySelector(".left").style.left = "0";

});


// ======================================================
// CLOSE BUTTON
// ======================================================

document.querySelector(".close").addEventListener("click", () => {

    console.log("close clicked");

    document.querySelector(".left").style.left = "-120%";

});


// ======================================================
// VOLUME
// ======================================================

let volumeButton =
    document.querySelector(".volume img");

let rangeDiv =
    document.querySelector(".range");


// ======================================================
// VOLUME RANGE
// ======================================================

document
    .querySelector(".range input")
    .addEventListener("input", (e) => {

        currentSong.volume =
            e.target.value / 100;

    });




    //  COMPLETE JS FLOW LOGIC 