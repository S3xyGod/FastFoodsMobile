import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  phone: '',
  password: '',
  status: '',
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const currentUser = action.payload;
      return currentUser;
    },
    setDefaultUser: () => {
      const defaultUser = initialState;
      return defaultUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCurrentUser, setDefaultUser} = userSlice.actions;

export default userSlice.reducer;
