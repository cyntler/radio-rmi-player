import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Song } from '../models';

export const useNowPlayingSocket = () => {
  const { lastJsonMessage } = useWebSocket(
    'wss://server.radiormi.pl/api/live/nowplaying/radiormi'
  );
  const [listenUrl, setListenUrl] = useState('');
  const [song, setSong] = useState<Song | undefined>();

  useEffect(() => {
    if (!lastJsonMessage) return;

    setListenUrl(lastJsonMessage.station?.listen_url);
    setSong({
      artist: lastJsonMessage.now_playing?.song?.artist,
      title: lastJsonMessage.now_playing?.song?.title,
      coverUrl: lastJsonMessage.now_playing?.song?.art,
    });
  }, [lastJsonMessage]);

  return {
    listenUrl,
    song,
  };
};
