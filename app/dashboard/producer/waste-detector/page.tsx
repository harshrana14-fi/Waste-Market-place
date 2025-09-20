'use client';

import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import Camera from '@/components/Camera';

const suggestions: Record<string, string> = {
  plastic: 'Recycle into bottles or containers',
  paper: 'Recycle or reuse for notebooks',
  metal: 'Recycle into metal products',
  glass: 'Recycle into new glass products',
  banana: 'Compost as organic waste',
  // Add more mappings here
};

const Home: React.FC = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [prediction, setPrediction] = useState<string>('');

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleFrame = async (video: HTMLVideoElement) => {
    if (!model) return;
    const predictions = await model.classify(video);
    if (predictions.length > 0) {
      setPrediction(predictions[0].className.toLowerCase());
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Waste Detection App</h1>
      <Camera onFrame={handleFrame} />
      <h2>Detected: {prediction}</h2>
      <p>Suggestion: {suggestions[prediction] || 'No suggestion available'}</p>
    </div>
  );
};

export default Home;
