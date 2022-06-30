import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getDate} from '../store/birthdaySlice';

const LoadingScreen = () => {
  const BirthdayDate = useSelector(getDate);
  console.log(BirthdayDate);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
});
