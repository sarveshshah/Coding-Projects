/* global audio */

var currentPlaylist=[];
var shufflePlaylist=[];
var tempPlaylist=[];
var audioElement;
var mouseDown=false;
var currentIndex=0;
var repeat=false;
var shuffle=false;
var userLoggedIn;
var timer;

function playFirstSong(){
    setTrack(tempPlaylist[0], tempPlaylist ,true);
}

function openPage(url){
    if(timer!=null){
        clearTimeout(timer);
    }
    if(url.indexOf("?")==-1){
        url=url+"?";
    }
    var encodedUrl=encodeURI(url+ "&userLoggedIn="+userLoggedIn);
    $('#mainContent').load(encodedUrl);
    $("body").scrollTop(0);
    history.pushState(null,null,url);
}

function createPlaylist(){
    var popup=prompt("Please enter the name of your playlist");
    if(popup!=null){
        $.post("includes/handlers/ajax/createPlaylist.php", {name: popup, username: userLoggedIn})
                .done(function(error){
                    if(error!=null){
                        alert(error);
                        return;
                    }
                    openPage("yourMusic.php");
                });
    }
    
}

function formatTime(seconds){
    var time=Math.round(seconds);
    var minutes=Math.floor(time/60);
    var seconds=time-minutes*60;
    if(seconds<10)
        return minutes + ".0" + seconds;
    else 
        return minutes + "." + seconds;
        
}

function updateTimeProgressBar(audio){
    $(".progressTime.current").text(formatTime(audio.currentTime));
    $(".progressTime.remaining").text(formatTime(audio.duration-audio.currentTime));
    
    var progress=audio.currentTime/audio.duration*100;
    $(".playbackBar .progress").css("width", progress+"%");
}

function updateVolumeProgressBar(audio){
    var volume=audio.volume*100;
    $(".volumeBar .progress").css("width", volume+"%");
}


function Audio(){
    this.currentlyPlaying;
    this.audio = document.createElement('audio');
    
    this.audio.addEventListener("ended", function(){
        nextSong();
    });
    
    this.audio.addEventListener("canplay",function(){
        var duration=this.duration;
        $(".progressTime.remaining").text(formatTime(duration));
        updateVolumeProgressBar(this);
    }); 
    
    this.audio.addEventListener("timeupdate",function(){
        if(this.duration){
            updateTimeProgressBar(this);
        }
    });
    
    this.audio.addEventListener("volumechange",function(){
        updateVolumeProgressBar(this);
    }); 
    
    this.setTrack=function(track){
        this.currentlyPlaying=track;
        this.audio.src=track.path;
    }
    
    this.play=function(){
        this.audio.play();
    }
    
    this.pause=function(){
        this.audio.pause();
    }

    this.setTime =function(seconds){
        this.audio.currentTime=seconds;
    }
}
