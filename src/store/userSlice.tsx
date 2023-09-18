import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  userName: string;
  userExpression: string;
  userXYEyePosition: never[] | number[];
} = {
  userName: '',
  userExpression: '',
  userXYEyePosition: [],
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
    setUserXYEyePosition(state, action) {},
  },
});

export const userActions = userSlice.actions;
