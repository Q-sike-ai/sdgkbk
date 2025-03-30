import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { SoundOutlined, AudioMutedOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const MusicButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9) !important;
  border: 2px solid #1890ff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  .anticon {
    font-size: 24px;
    color: #1890ff;
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 1) !important;
  }
`;

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      
      // 监听音频加载完成事件
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('音频加载完成');
        setIsLoaded(true);
      });

      // 监听音频错误事件
      audioRef.current.addEventListener('error', (e) => {
        console.error('音频加载失败:', e);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadeddata', () => {});
          audioRef.current.removeEventListener('error', () => {});
        }
      };
    }
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !isLoaded) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('播放控制失败:', error);
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
        type="primary"
        icon={isPlaying ? <SoundOutlined /> : <AudioMutedOutlined />}
        onClick={togglePlay}
        title={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
      />
    </>
  );
};

export default BackgroundMusic; 