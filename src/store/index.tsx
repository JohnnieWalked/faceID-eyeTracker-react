import { configureStore } from '@reduxjs/toolkit';

import { uploadPhotoSlice } from './uploadPhotoSlice';
import { userSlice } from './userSlice';

const store = configureStore({
  reducer: {
    uploadPhoto: uploadPhotoSlice.reducer,
    userSlice: userSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
