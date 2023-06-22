import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {
  JSON_API_URL,
  SERVER_STATION_NAME,
  Song,
  WEBSOCKET_API_URL,
} from '../models';
import { ApiResponse } from '../modelsApiResponse';

export const useNowPlaying = () => {
  const isWebSocketSubscribedRef = useRef(false);
  const { lastJsonMessage, sendJsonMessage, readyState } =
    useWebSocket<any>(WEBSOCKET_API_URL);
  const [listenUrl, setListenUrl] = useState('');
  const [description, setDescription] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [song, setSong] = useState<Song | undefined>();
  const [nextSong, setNextSong] = useState<Song | undefined>();

  const setDataFromApi = ({
    station: { listen_url: apiListenUrl, description: apiDescription },
    now_playing: { song: currentSong, playlist: currentPlaylist },
    playing_next,
  }: ApiResponse) => {
    setListenUrl(apiListenUrl);
    setDescription(apiDescription);
    setPlaylist(currentPlaylist);

    const songData = {
      artist: currentSong.artist,
      title: currentSong.title,
      coverUrl: currentSong.art,
    };

    if (JSON.stringify(song) !== JSON.stringify(songData)) {
      setSong(songData);
    }

    if (playing_next && playing_next.song) {
      const nextSongData = {
        artist: playing_next.song.artist,
        title: playing_next.song.title,
        coverUrl: playing_next.song.art,
      };

      if (JSON.stringify(nextSong) !== JSON.stringify(nextSongData))
        setNextSong(nextSongData);
    }
  };

  const fetchInitialData = useCallback(async () => {
    const response = await fetch(JSON_API_URL);
    const jsonData = await response.json();

    if (jsonData) {
      setDataFromApi(jsonData as ApiResponse);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isWebSocketSubscribedRef.current && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        subs: {
          [`station:${SERVER_STATION_NAME}`]: {},
        },
      });

      isWebSocketSubscribedRef.current = true;
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.pub?.data?.np) {
      setDataFromApi(lastJsonMessage.pub.data.np as ApiResponse);
    }
    // eslint-disable-next-line
  }, [lastJsonMessage]);

  return {
    listenUrl,
    description,
    playlist,
    song,
    nextSong,
  };
};
