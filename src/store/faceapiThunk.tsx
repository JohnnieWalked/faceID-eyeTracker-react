import { createAsyncThunk } from '@reduxjs/toolkit';
import * as faceapi from 'face-api.js';

export const fetchModels = createAsyncThunk('models/fetch', async () => {
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  ]);
});
