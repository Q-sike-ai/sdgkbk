import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { SoundOutlined, AudioMutedOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const MusicButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      
      // 尝试自动播放
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('自动播放失败:', error);
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/sdgkbk/images/状元郎.MP3"
        preload="auto"
      />
      <MusicButton
        icon={isPlaying ? <SoundOutlined /> : <AudioMutedOutlined />}
        onClick={togglePlay}
      />
    </>
  );
};

export default BackgroundMusic; 