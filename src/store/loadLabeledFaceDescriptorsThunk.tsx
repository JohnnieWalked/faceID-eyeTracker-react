import { createAsyncThunk } from '@reduxjs/toolkit';
import * as faceapi from 'face-api.js';

type loadLabeledFaceDescriptorsProps = {
  userPhoto: string;
  userName: string;
};

export const loadLabeledFaceDescriptors = createAsyncThunk(
  'loadLabeledFaceDescriptors',
  async (props: loadLabeledFaceDescriptorsProps) => {
    const { userPhoto, userName } = props;

    const img = await faceapi.fetchImage(userPhoto);
    const fullFaceDescription = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!fullFaceDescription) {
      alert('No face detected. Please, try another image.');
      return null;
    }

    const faceDescriptors = [fullFaceDescription.descriptor];
    return new faceapi.LabeledFaceDescriptors(userName, faceDescriptors);
  }
);
