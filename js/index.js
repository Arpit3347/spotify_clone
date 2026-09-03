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




// selecting songinfo that contain songname on Player
let songInfo = document.querySelector(".actualname");

    // Make every song clickable
    songList.forEach((li,index)=>{
        li.addEventListener("click",()=>{
             
            currentIndex = index;

            console.log("clicked:", songNames[currentIndex]);
            currentSong.src= songs[currentIndex];
            currentSong.play();
            
            // putting currentsong name on songinfo div
            songInfo.innerHTML = songNames[currentIndex] +".mp3";

            changeBackground();


            // right side color changes to ambient background from background folder
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

   if(currentIndex>=songs.length){
    currentIndex=0;
   }

    currentSong.src = songs[currentIndex];
    currentSong.play();

    songInfo.innerHTML = songNames[currentIndex] +".mp3";
   

    // ambient background function calls when next button clicked
    changeBackground();



 // right side color changes to ambient background from background folder
    document.querySelector(".right").classList.add("ambient-active");

})



// back button working 
let previousButton = document.querySelector(".backmusic");

previousButton.addEventListener("click", ()=>{
    currentIndex--;
     
    if(currentIndex<0){
        currentIndex = songs.length - 1;
    }
    currentSong.src = songs[currentIndex];
    currentSong.play();

    songInfo.innerHTML = songNames[currentIndex] +".mp3";


    // ambient background calls when previous button clicked
    changeBackground();


 // right side color changes to ambient background from background folder
    document.querySelector(".right").classList.add("ambient-active");


})



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

}


// range div appers when volume button clicked

let volumeButton = document.querySelector(".volume img ");

let rangeDiv = document.querySelector(".range");






// making actual working of range div 
document.querySelector(".range input").addEventListener("input", (e) => {

    currentSong.volume = e.target.value/100;

});




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


    //    then we add close button working , hamburger working ,making responsiveess , making seekbar ,circle working add volume button working , making ambient background working and then add : a folder into starting getSongs() async function to add dynamic albums 
    