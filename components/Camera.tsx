'use client';

import React, { useRef, useEffect } from 'react';

interface CameraProps {
  onFrame: (video: HTMLVideoElement) => void;
}

const Camera: React.FC<CameraProps> = ({ onFrame }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };
    setupCamera();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && onFrame) {
        onFrame(videoRef.current);
      }
    }, 500); // Capture a frame every 500ms

    return () => clearInterval(interval);
  }, [onFrame]);

  return <video ref={videoRef} width={400} height={300} autoPlay />;
};

export default Camera;
