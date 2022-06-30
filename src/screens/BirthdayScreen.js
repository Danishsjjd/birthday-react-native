import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import Dialog from 'react-native-dialog';
import {useDispatch, useSelector} from 'react-redux';
import ConfettiCannon from 'react-native-confetti-cannon';
import birthdayImg from '../assets/Cake.png';

import {Screen, Text} from '../components';
import useTheme from '../hooks/useTheme';
import Counter from '../utils/Counter';
import {
  setBirthdayDate,
  getDate,
  getShowCounter,
  setShowCounter,
  getPersonName,
  setPersonName,
  getIsBirthday,
} from '../store/birthdaySlice';

const images = [
  require('../assets/1.jpg'),
  require('../assets/2.jpg'),
  require('../assets/3.jpg'),
  require('../assets/4.jpg'),
  require('../assets/5.jpg'),
  require('../assets/6.jpg'),
  require('../assets/7.png'),
];

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const BirthdayScreen = () => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const isBirthday = useSelector(getIsBirthday);

  const date = useSelector(getDate);
  const [actualDate, setActualDate] = useState();

  const showCounter = useSelector(getShowCounter);
  const [showPrompt, setShowPrompt] = useState(false);

  const personName = useSelector(getPersonName);

  useEffect(() => {
    const year = new Date(date).setFullYear(new Date().getFullYear());
    const timeInS = Math.floor((year - new Date().getTime()) / 1000);
    const days = Math.floor(timeInS / 60 / 60 / 24);
    if (days < -1) {
      setActualDate(new Date(date).setFullYear(new Date().getFullYear() + 1));
    } else {
      setActualDate(new Date(year));
    }
  }, [date]);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      maximumDate: new Date(),
      onChange: async (event, selectedDate) => {
        if (event.type == 'dismissed') return;
        const dateSelectByUser = new Date(selectedDate);
        const year = dateSelectByUser.getFullYear();
        const userSelectedMonth = dateSelectByUser.getMonth();
        const userSelectedDate = dateSelectByUser.getDate();
        const finalDate = new Date(year, userSelectedMonth, userSelectedDate);

        dispatch(setBirthdayDate(finalDate));
        await AsyncStorage.setItem('Date', `${finalDate}`);
        setShowPrompt(true);
      },
    });
  };

  return (
    <Screen style={styles.container}>
      {isBirthday && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}

      {!date && showDatePicker()}

      <View style={[styles.circle, {backgroundColor: colors.danger}]} />
      <View style={[styles.line, {width: 30, marginTop: 10, marginLeft: 15}]} />
      <View style={styles.textContainer}>
        <Text style={styles.birthdayText}>
          {personName ? personName : 'Person'}'s {'\n'}Birthday!
        </Text>
        <Text style={styles.dateText}>
          {date?.getDate() || new Date().getDate()}.
          {month[date?.getMonth()] || month[new Date().getMonth()]}.
          {date?.getFullYear() || new Date().getFullYear()}
        </Text>
      </View>
      <View style={[styles.line, {width: '80%'}]} />
      {isBirthday ? (
        <View
          style={[
            styles.middleContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={{fontSize: 23, fontWeight: '700'}}>
            Today is Your Birthday
          </Text>
          <Image
            source={birthdayImg}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.middleContainer}>
          <Image
            style={styles.image}
            source={images[new Date().getDay()]}
            resizeMode="contain"
          />
        </View>
      )}
      {showCounter && <Counter date={actualDate} />}
      <View style={[styles.actions]}>
        <Dialog.Container visible={showPrompt}>
          <Dialog.Title>Enter Your Name</Dialog.Title>
          <Dialog.Input
            onChangeText={async text => {
              dispatch(setPersonName(text));
              await AsyncStorage.setItem('personName', text);
            }}
            value={personName}
          />
          <Dialog.Button
            label="Set"
            onPress={() => {
              if (personName?.length < 2 || personName == null) {
                return alert('Please Enter Your Name');
              }
              setShowPrompt(false);
              dispatch(setShowCounter(true));
            }}
          />
        </Dialog.Container>

        <Pressable
          onPress={() => {
            if (!showCounter) {
              showDatePicker();
            } else {
              alert(
                'You already add user. Please Edit if you want to change something',
              );
            }
          }}>
          <Text>Add</Text>
        </Pressable>

        <View style={styles.thinLine} />

        <Pressable
          onPress={() => {
            if (showCounter) {
              showDatePicker();
            } else {
              alert('Please add user first');
            }
          }}>
          <Text>Edit</Text>
        </Pressable>
      </View>
    </Screen>
  );
};

export default BirthdayScreen;

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  birthdayText: {
    fontWeight: '700',
    fontSize: 35,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  dateText: {},
  image: {
    width: 300,
    height: 300,
    left: 50,
  },
  line: {
    height: 0.8,
    backgroundColor: 'white',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textContainer: {
    paddingVertical: 10,
  },
  thinLine: {
    height: 0.5,
    width: 80,
    backgroundColor: 'white',
    transform: [{rotate: '-45deg'}],
  },
});
