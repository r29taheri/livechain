import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Client } from '@livepeer/webrtmp-sdk';

export const useStream = (streamKey: string) => {
  const stream = useRef<any>(null);
  const session = useRef<any>(null);
  const [isLive, setIsLive] = useState(false);
  const [videoStream, setVideoStream] = useState<any>(null);

  const client = useMemo(() => new Client(), []);

  const handleGetStream = useCallback(async () => {
    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setVideoStream(stream.current);
  }, []);

  const handleBroadcast = useCallback(async () => {
    session.current = client.cast(stream.current, streamKey);

    session.current.on('open', () => {
      console.log('Stream started.');
      setIsLive(true);
    });

    session.current.on('close', () => {
      console.log('Stream stopped.');
      setIsLive(false);
    });

    session.current.on('error', (err: any) => {
      console.log('Stream error.', err.message);
      setIsLive(false);
    });
  }, [client, streamKey]);

  const handleStopBroadCast = useCallback(async () => {
    session.current.close();
  }, []);

  const disposeMediaTracks = useCallback(() => {
    if (stream && stream.current) {
      stream.current.getVideoTracks().forEach((track: any) => {
        console.dir('track', track);
        track.stop();
      });
      setVideoStream(null);
    }
  }, []);

  useEffect(() => {
    handleGetStream();

    return () => {
      disposeMediaTracks();
    };
  }, [handleGetStream, disposeMediaTracks]);

  return {
    isLive,
    videoStream,
    handleBroadcast,
    handleStopBroadCast,
  };
};
