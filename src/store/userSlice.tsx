import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  userName: string;
  userExpression: string;
  userArea: null | DOMRect;
} = {
  userName: '',
  userExpression: '',
  userArea: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserExpression(state, action) {
      state.userExpression = action.payload;
    },
    setUserAreaXY(state, action) {
      state.userArea = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
