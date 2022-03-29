import { useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { JSON_API_URL, Song, WEBSOCKET_API_URL } from '../models';
import { ApiResponse } from '../modelsApiResponse';

export const useNowPlaying = () => {
  const { lastJsonMessage } = useWebSocket(WEBSOCKET_API_URL);
  const [listenUrl, setListenUrl] = useState('');
  const [description, setDescription] = useState('');
  const [song, setSong] = useState<Song | undefined>();

  const setDataFromApi = ({
    station: { listen_url: apiListenUrl, description: apiDescription },
    now_playing: {
      song: { artist, title, art: coverUrl },
    },
  }: ApiResponse) => {
    setListenUrl(apiListenUrl);
    setDescription(apiDescription);
    setSong({
      artist,
      title,
      coverUrl,
    });
  };

  const fetchInitialData = useCallback(async () => {
    const response = await fetch(JSON_API_URL);
    const jsonData = await response.json();

    if (jsonData) {
      setDataFromApi(jsonData as ApiResponse);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (lastJsonMessage) {
      setDataFromApi(lastJsonMessage as ApiResponse);
    }
  }, [lastJsonMessage]);

  return {
    listenUrl,
    song,
    description,
  };
};
