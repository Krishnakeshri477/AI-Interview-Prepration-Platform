// frontend\src\hooks\useAudioPlayer.js
import { useState, useRef, useEffect } from 'react';

const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  const playAudio = (url) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = url;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(false);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
      audioRef.current = audio;
    }
    setAudioUrl(url);
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return { isPlaying, playAudio, pauseAudio, stopAudio, audioRef, currentAudioUrl: audioUrl };
};

export default useAudioPlayer;