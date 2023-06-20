import { PLAYLIST_COVER_STRATEGY } from '../models';

export const getCustomPlaylistCover = (playlistName: string) =>
  PLAYLIST_COVER_STRATEGY[playlistName];
