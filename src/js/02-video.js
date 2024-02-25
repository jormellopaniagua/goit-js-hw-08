import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');

const savePlaybackTime = () => {
  vimeoPlayer.getCurrentTime().then(time => {
    localStorage.setItem('videoplayer-current-time', time);
  });
};

const setPlaybackTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    vimeoPlayer.setCurrentTime(savedTime).then(() => {
      vimeoPlayer.play();
    });
  }
};

vimeoPlayer.on('timeupdate', throttle(savePlaybackTime, 1000));
setPlaybackTime();
