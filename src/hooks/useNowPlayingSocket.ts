import { useCallback, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Song } from '../models';

const SERVER_URL = 'server.radiormi.pl';
const STATION_NAME = 'radiormi';

export const useNowPlayingSocket = () => {
  const { lastJsonMessage } = useWebSocket(
    `wss://${SERVER_URL}/api/live/nowplaying/${STATION_NAME}`
  );
  const [listenUrl, setListenUrl] = useState('');
  const [song, setSong] = useState<Song | undefined>();
  const [description, setDescription] = useState('');

  const setData = (jsonMessage: any) => {
    setListenUrl(jsonMessage.station?.listen_url);
    setDescription(jsonMessage.station?.description);
    setSong({
      artist: jsonMessage.now_playing?.song?.artist,
      title: jsonMessage.now_playing?.song?.title,
      coverUrl: jsonMessage.now_playing?.song?.art,
    });
  };

  const fetchInitialData = useCallback(async () => {
    const response = await fetch(
      `https://${SERVER_URL}/api/nowplaying_static/${STATION_NAME}.json`
    );
    const jsonData = await response.json();

    if (jsonData) {
      setData(jsonData);
    }
  }, []);

  useEffect(() => {
    if (lastJsonMessage) {
      setData(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    listenUrl,
    song,
    description,
  };
};
