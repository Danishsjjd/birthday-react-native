import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isBirthday: false,
  birthdayDate: null,
  showCounter: false,
  personName: '',
};

const birthdaySlice = createSlice({
  name: 'birthdaySlice',
  initialState,
  reducers: {
    setIsBirthday: (state, action) => {
      state.isBirthday = action.payload;
    },
    setBirthdayDate: (state, action) => {
      state.birthdayDate = action.payload;
    },
    setShowCounter: (state, action) => {
      state.showCounter = action.payload;
    },
    setPersonName: (state, action) => {
      state.personName = action.payload;
    },
  },
});

export const {setIsBirthday, setBirthdayDate, setShowCounter, setPersonName} =
  birthdaySlice.actions;

export default birthdaySlice.reducer;

export const getIsBirthday = state => state.birthdaySlice.isBirthday;
export const getDate = state => state.birthdaySlice.birthdayDate;
export const getShowCounter = state => state.birthdaySlice.showCounter;
export const getPersonName = state => state.birthdaySlice.personName;
