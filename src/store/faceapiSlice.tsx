import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchModels } from './faceapiThunk';

const initialState: {
  // models: null | void[];
  isLoading: boolean;
  error: null | SerializedError;
} = {
  // models: null,
  isLoading: true,
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
      // state.models = action.payload;
    });
    builder.addCase(fetchModels.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
