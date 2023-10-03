import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchModels } from './faceapiThunk';
import { loadLabeledFaceDescriptors } from './loadLabeledFaceDescriptorsThunk';

const initialState: {
  isLoading: boolean;
  isLoadingImage: boolean;
  error: null | SerializedError;
} = {
  isLoading: true,
  isLoadingImage: false,
  error: null,
};

export const faceapiSlice = createSlice({
  name: 'faceapi',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchModels.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchModels.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchModels.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(loadLabeledFaceDescriptors.pending, (state) => {
      state.isLoadingImage = true;
    });
    builder.addCase(loadLabeledFaceDescriptors.fulfilled, (state) => {
      state.isLoadingImage = false;
      state.error = null;
    });
    builder.addCase(loadLabeledFaceDescriptors.rejected, (state, action) => {
      state.isLoadingImage = false;
      state.error = action.error;
    });
  },
});
