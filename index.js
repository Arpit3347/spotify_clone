let currentSong = new Audio();
// currentSong act a music player


// Get songs from folder
async function getSongs() {


// here we first make fetch the all songs from their songs folder but then to make it dynamic album we take a parameter folder in getSongs() 

    let a = await fetch(
        'http://127.0.0.1:5501/PROJECTS/Spotify%20FrontEnd/songs/'
    );

    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let alinks = div.getElementsByTagName("a");

    let songs = [];

    for (let i = 0; i < alinks.length; i++) {

        const element = alinks[i];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }

    return songs;
}


async function main() {

    // Get song URLs
    let songs = await getSongs();





    // declare  radio svg 
const radioSongImage = document.querySelector("#radioSongImage");
const radioSvg = document.querySelector(".radio-svg");




  


    // Convert URLs into song names
    let songNames = songs.map((e) => {

        return decodeURIComponent(
            e.split("/").pop().replace(".mp3", "")
        );

    });


    // Get <ul>
    let songUl = document
        .querySelector(".songlist")
        .getElementsByTagName("ul")[0];


    // Create song cards
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
                    <img class="musicplayicon" src="playbutton.svg" alt="">
                </div>
            </li>
        `;
    }


    // Till now i have a
    // 1. songs variable containing [songs complete url] , 
    // 2. songNames array containing [baremininmum , gucci , kale kagaz , gundagarh  ..... etc ]
    // 3.  list cards containg songNames 




    // making play , next , back button working . also making li cards clickable , seekbar clickable and circle moving

    // Get all song <li>
     let songList =  Array.from(document.querySelector(".songlist").getElementsByTagName("li"));



let currentIndex = 0;





  // selecting ambient background image
    let ambientBg = document.querySelector(".ambient-bg");



// function for the ambient background image 
function changeBackground() {

    let fileName = decodeURIComponent(
        songs[currentIndex].split("/").pop().replace(".mp3", "")
    );

    ambientBg.style.backgroundImage =
        `url("backgrounds/${fileName}.jpg")`;

    ambientBg.style.opacity = "0.8";


}

// ======================================================
//       CHANGE IMAGE INSIDE RADIO SVG
// ======================================================

function changeRadioImage() {

    // Get current song name
    //
    // Example:
    // songs/Faded.mp3
    //
    // becomes:
    // Faded

    let fileName = decodeURIComponent(
        songs[currentIndex].split("/").pop().replace(".mp3", "")
    );


    // Create image path
    //
    // Faded
    //   ↓
    // backgrounds/Faded.jpg
    //
    // If your radio images are in another folder,
    // change "backgrounds" to that folder name.

    let imageUrl = `backgrounds/${fileName}.jpg`;


    // Put this image inside the CENTER of the SVG

    
radioSongImage.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    imageUrl
);

}





// selecting songinfo that contain songname on Player
let songInfo = document.querySelector(".actualname");


    // Make every song clickable
    songList.forEach((li,index)=>{
        
   li.addEventListener("click",()=>{ 

    // Get clicked song index
    currentIndex = index;

    console.log("clicked:", songNames[currentIndex]);


    // Play clicked song
    currentSong.src = songs[currentIndex];
    currentSong.play();


    // Show song name in playbar
    songInfo.innerHTML = songNames[currentIndex] + ".mp3";


    // Change background
    changeBackground();


    // ⭐ NEW
    // Change image in center of radio
    changeRadioImage();


    // Show ambient background
    document.querySelector(".right").classList.add("ambient-active");

});


    })

  

    // making  play/pause button working
let playbutton = document.querySelector(".playmusic");

playbutton.addEventListener("click",()=>{
      if(currentSong.paused){
           currentSong.play();
           playbutton.src = "pause.svg"


        //    making ambient background visible when play clicks
           changeBackground();
      }
      else{

        currentSong.pause();
        playbutton.src = "music.svg"



        // when play button is paused then ambient background will not be visible
         ambientBg.style.opacity = "0";



        //  When paused, bring the bg-gray color back of right side
          document.querySelector(".right").classList.remove("ambient-active");


      }
})



// next button working
let nextButton = document.querySelector(".nextmusic");

nextButton.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= songs.length){
        currentIndex = 0;
    }


    // Play next song
    currentSong.src = songs[currentIndex];
    currentSong.play();


    // Change song name
    songInfo.innerHTML = songNames[currentIndex] + ".mp3";


    // Change background
    changeBackground();


    // ⭐ Change radio image
    changeRadioImage();


    // Show ambient background
    document.querySelector(".right").classList.add("ambient-active");

});



// back button working
let previousButton = document.querySelector(".backmusic");

previousButton.addEventListener("click", ()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = songs.length - 1;
    }


    // Play previous song
    currentSong.src = songs[currentIndex];
    currentSong.play();


    // Change song name
    songInfo.innerHTML = songNames[currentIndex] + ".mp3";


    // Change background
    changeBackground();


    // ⭐ Change radio image
    changeRadioImage();


    // Show ambient background
    document.querySelector(".right").classList.add("ambient-active");

});




// song playing => circle moves 
let seekbar = document.querySelector(".seekbar");
let circle = document.querySelector(".circle");


currentSong.addEventListener("timeupdate", () => {

    let percentage =
        (currentSong.currentTime / currentSong.duration) * 100;
        // let currentsong.currentime = 20s and currentsong.duration = 500sec
        // currenttime and duration are js methods



    circle.style.left = percentage + "%";

});




seekbar.addEventListener("click", (e) => {

    let percent =
        e.offsetX / seekbar.offsetWidth;

        // e.offsetX means how many pixel user click on seekbar bar x axis example : 20px clicked
        //  seekbar.offsetWidth means seekbar total width

    currentSong.currentTime =
        percent * currentSong.duration;

});


// making hamburger clickable 

let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", ()=>{

    document.querySelector(".left").style.left = "0";

}) 


//close button working 
 document.querySelector(".close").addEventListener("click", ()=>{

    console.log('close clicked');


       document.querySelector(".left").style.left = "-120%";
})


// range div appers when volume button clicked

let volumeButton = document.querySelector(".volume img ");

let rangeDiv = document.querySelector(".range");






// making actual working of range div 
document.querySelector(".range input").addEventListener("input", (e) => {

    currentSong.volume = e.target.value/100;

});







// ======================================================
//          RADIO ROTATES WHEN SONG PLAYS
// ======================================================

currentSong.addEventListener("play", () => {

    // Add CSS class
    //b
    // CSS will start the rotation

    console.log("Play Event Fired");

    radioSvg.classList.add("playing");
    console.log(radioSvg.classList);

});

// ======================================================
//          RADIO STOPS WHEN SONG PAUSES
// ======================================================

currentSong.addEventListener("pause", () => {

    // Remove CSS class
    //
    // CSS rotation stops

    radioSvg.classList.remove("playing");

});




}



main();





// ALL LOGICS CHART

/*                 GET SONGS
                       ↓
                 songs[] URLs
                       ↓
                songNames[] names
                       ↓
                CREATE <li>
                       ↓
               USER CLICKS SONG
                       ↓
                get its index
                       ↓
              currentIndex = index
                       ↓
              songs[currentIndex]
                       ↓
               currentSong.src
                       ↓
                 currentSong.play()
                       ↓
                  🎵 PLAYING
                       ↓
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       PREVIOUS       PLAY        NEXT
          ↓            ↓            ↓
      index - 1    play/pause    index + 1    */ 


    //    then we add close button working , hamburger working ,making responsiveess , making seekbar ,circle working add volume button working , making ambient background working 


    // radio button working : - 
//     click song
//    ↓
// currentIndex changes
//    ↓
// background changes
//    ↓
// radio center image changes
//    ↓
// song plays
//    ↓
// radio rotates