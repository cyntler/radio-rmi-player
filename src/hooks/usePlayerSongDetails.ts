import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { stationContext } from '../contexts/stationContext';
import {
  CURRENT_SONG_HEADING,
  NEXT_SONG_HEADING,
  PlayerStatus,
  SHOW_NEXT_SONG_AFTER_SECONDS,
  SHOW_NEXT_SONG_AGAIN_AFTER_SECONDS,
  SHOW_PREVIOUSLY_CURRENT_SONG_AFTER_SECONDS,
} from '../models';
import { getFullSongName } from '../utils/getFullSongName';

export const usePlayerSongDetails = () => {
  const { status, song, nextSong } = useContext(stationContext);
  const nextSongTimeout = useRef<NodeJS.Timeout>();
  const [heading, setHeading] = useState(CURRENT_SONG_HEADING);
  const [title, setTitle] = useState('');

  const clearNextSongTimeout = () => {
    if (nextSongTimeout.current) {
      clearTimeout(nextSongTimeout.current);
    }
  };

  const showCurrentSong = useCallback(() => {
    if (song) {
      setHeading(CURRENT_SONG_HEADING);
      setTitle(getFullSongName(song.artist, song.title));
    }
  }, [song]);

  const showNextSongTimeoutStart = useCallback(
    (timeout?: number) => {
      clearNextSongTimeout();

      if (nextSong) {
        nextSongTimeout.current = setTimeout(
          () => {
            setHeading(NEXT_SONG_HEADING);
            setTitle(getFullSongName(nextSong.artist, nextSong.title));
            setTimeout(() => {
              showCurrentSong();
              if (!timeout) {
                showNextSongTimeoutStart(SHOW_NEXT_SONG_AGAIN_AFTER_SECONDS);
              }
            }, 1000 * SHOW_PREVIOUSLY_CURRENT_SONG_AFTER_SECONDS);
          },
          1000 * (timeout || SHOW_NEXT_SONG_AFTER_SECONDS),
        );
      }
    },
    [showCurrentSong, nextSong],
  );

  useEffect(() => {
    clearNextSongTimeout();

    if (song) {
      setHeading(CURRENT_SONG_HEADING);
      setTitle(getFullSongName(song.artist, song.title));
    }
  }, [song]);

  useEffect(() => {
    if (status === PlayerStatus.PLAYING) {
      showNextSongTimeoutStart();
      return;
    }

    clearNextSongTimeout();
  }, [status, showNextSongTimeoutStart]);

  return {
    heading,
    title,
    isNextSongShown: heading === NEXT_SONG_HEADING,
  };
};
