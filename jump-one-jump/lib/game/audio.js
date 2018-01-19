const audioMap = {
    "jumpdone":"res/wx/combo1.mp3"
};


const playMap = {};
function play(key,load) {
    if(playMap[key]){
        playMap[key].currentTime = 0;
        playMap[key].play();
    }else{
        let player = document.createElement('audio');

        player.setAttribute('autoplay','autoplay');
        document.body.appendChild(player);
        let music = document.createElement('source');
        music.src = audioMap[key]?audioMap[key]:key;
        music.type= 'audio/wav';
        player.appendChild(music);

        player.load();

        if(load) {
            player.pause();
            player.currentTime = 0;
        }else{
            player.play();
        }
        playMap[key] = player;
    }
}

function initBGMPlayer(evt) {
    Object.keys(audioMap).forEach(function (key) {
        play(key,true);
    });

    window.removeEventListener("touchstart",initBGMPlayer);
}
window.addEventListener('touchstart', initBGMPlayer);


module.exports = {
    play:play
};