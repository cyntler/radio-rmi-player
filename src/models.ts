import logoImg from './assets/logo.png';
import playImg from './assets/play.svg';

export interface Song {
  artist: string;
  title: string;
  coverUrl: string;
}

export interface StationContext {
  listenUrl: string;
  song?: Song;
  description: string;
  isPlaying: boolean;
  audioRef?: HTMLAudioElement;
  playStation: () => void;
}

export const SERVER_URL = 'server.radiormi.pl';
export const SERVER_STATION_NAME = 'radiormi';
export const WEBSOCKET_API_URL = `wss://${SERVER_URL}/api/live/nowplaying/${SERVER_STATION_NAME}`;
export const JSON_API_URL = `https://${SERVER_URL}/api/nowplaying_static/${SERVER_STATION_NAME}.json`;

export const assets = {
  logo: logoImg,
  play: playImg,
};
