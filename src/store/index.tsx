import { configureStore } from '@reduxjs/toolkit';

import { uploadPhotoSlice } from './uploadPhotoSlice';
import { userSlice } from './userSlice';
import { faceapiSlice } from './faceapiSlice';

const store = configureStore({
  reducer: {
    uploadPhoto: uploadPhotoSlice.reducer,
    userSlice: userSlice.reducer,
    faceapiSlice: faceapiSlice.reducer,
  },
});

export default store;
export * from './faceapiThunk';
export * from './loadLabeledFaceDescriptorsThunk';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
