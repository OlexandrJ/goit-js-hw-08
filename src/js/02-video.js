import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);
const saveCurrentTime = (time) => {
    localStorage.setItem('videoplayer-current-time', time);
};
const restoreCurrentTime = () => {
    const currentTime = localStorage.getItem('videoplayer-current-time');
    if (currentTime) {
        player.setCurrentTime(parseFloat(currentTime));
    }
};

player.on('timeupdate', throttle((event) => {
    const currentTime = event.seconds;
    saveCurrentTime(currentTime);
}, 1000));

window.addEventListener('load', () => {
    restoreCurrentTime();
});
