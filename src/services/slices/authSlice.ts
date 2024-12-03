import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isLogin: boolean; // Type for theme state
}

const initialState: ThemeState = {
  isLogin: false, // Default theme
};

const authReducer = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLoginUser(state:ThemeState, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const { setLoginUser } = authReducer.actions;
export default authReducer.reducer;
