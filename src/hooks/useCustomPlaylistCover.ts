import { useMemo } from 'react';
import { getCustomPlaylistCover } from '../utils/getCustomPlaylistCover';

export const useCustomPlaylistCover = (playlist: string) =>
  useMemo(() => getCustomPlaylistCover(playlist), [playlist]);
