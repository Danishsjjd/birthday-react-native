import {configureStore} from '@reduxjs/toolkit';
import birthdaySlice from '../store/birthdaySlice';

const store = configureStore({
  reducer: {
    birthdaySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
