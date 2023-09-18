import { createSlice } from '@reduxjs/toolkit';

const initialState: { uploadedPhoto: null | string } = {
  uploadedPhoto: null,
};

export const uploadPhotoSlice = createSlice({
  name: 'upload-photo',
  initialState,
  reducers: {
    uploadPhoto(state, action) {
      state.uploadedPhoto = action.payload;
    },
  },
});

export const uploadPhotoActions = uploadPhotoSlice.actions;
