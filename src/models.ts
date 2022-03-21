import backgroundImg from './assets/background.jpg';
import logoImg from './assets/logo.png';
import playImg from './assets/play.svg';

export interface Song {
  artist: string;
  title: string;
  coverUrl: string;
}

export const assets = {
  background: backgroundImg,
  logo: logoImg,
  play: playImg,
};
