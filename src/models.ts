import logoImg from './assets/logo.png';
import playImg from './assets/play.svg';

import kultowePolskiePrzebojeImg from './assets/playlists/kultowe-polskie-przeboje.jpg';

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
  playlist: string;
  status: PlayerStatus;
  audioElement?: HTMLAudioElement;
  playStation: () => void;
}

export enum PlayerStatus {
  IDLE,
  LOADING,
  PLAYING,
}

export const assets = {
  logo: logoImg,
  play: playImg,
};

export const SERVER_URL = 'server.radiormi.pl';
export const SERVER_STATION_NAME = 'radiormi';
export const WEBSOCKET_API_URL = `wss://${SERVER_URL}/api/live/nowplaying/websocket`;
export const JSON_API_URL = `https://${SERVER_URL}/api/nowplaying_static/${SERVER_STATION_NAME}.json`;

export const CURRENT_SONG_HEADING = 'Teraz gramy';
export const NEXT_SONG_HEADING = 'Następnie zagramy';
export const SHOW_NEXT_SONG_AFTER_SECONDS = 30;
export const SHOW_NEXT_SONG_AGAIN_AFTER_SECONDS = 90;
export const SHOW_PREVIOUSLY_CURRENT_SONG_AFTER_SECONDS = 10;

export const PLAYLIST_COVER_STRATEGY: Record<string, string> = {
  'Kultowe Polskie Przeboje': kultowePolskiePrzebojeImg,
};
