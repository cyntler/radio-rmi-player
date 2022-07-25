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
  nextSong?: Song;
  description: string;
  isPlaying: boolean;
  audioRef?: HTMLAudioElement;
  playStation: () => void;
}

export const assets = {
  logo: logoImg,
  play: playImg,
};

export const SERVER_URL = 'server.radiormi.pl';
export const SERVER_STATION_NAME = 'radiormi';
export const WEBSOCKET_API_URL = `wss://${SERVER_URL}/api/live/nowplaying/${SERVER_STATION_NAME}`;
export const JSON_API_URL = `https://${SERVER_URL}/api/nowplaying_static/${SERVER_STATION_NAME}.json`;

export const CURRENT_SONG_HEADING = 'Teraz gramy';
export const NEXT_SONG_HEADING = 'Następnie zagramy';
export const SHOW_NEXT_SONG_AFTER_SECONDS = 30;
export const SHOW_NEXT_SONG_AGAIN_AFTER_SECONDS = 90;
export const SHOW_PREVIOUSLY_CURRENT_SONG_AFTER_SECONDS = 10;
