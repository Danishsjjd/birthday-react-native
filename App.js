import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Provider} from 'react-redux';

import store from './src/config/store';
import {BirthdayScreen, LoadingScreen} from './src/screens';
import {
  setBirthdayDate,
  setPersonName,
  setShowCounter,
} from './src/store/birthdaySlice';

AsyncStorage.getItem('personName')
  .then(name => {
    store.dispatch(setPersonName(name));
  })
  .catch(err => console.log(err));

const App = () => {
  const [loading, setLoading] = useState(true);
  AsyncStorage.getItem('Date')
    .then(date => {
      if (date != null) {
        store.dispatch(setBirthdayDate(new Date(date)));
        store.dispatch(setShowCounter(true));
      }
      setLoading(false);
    })
    .catch(error => console.log(error));
  return (
    <Provider store={store}>
      {loading ? <LoadingScreen loading={setLoading} /> : <BirthdayScreen />}
    </Provider>
  );
};
export default App;
