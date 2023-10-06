import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const saveTimeToStorage = (currentTime) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime));
};

const loadTimeFromStorage = () => {
    const savedTime = localStorage.getItem(STORAGE_KEY);
    return savedTime ? JSON.parse(savedTime) : 0;
};

player.setCurrentTime(loadTimeFromStorage());
player.on('timeupdate', throttle((data) => {
    saveTimeToStorage(data.seconds);
}, 1000));
