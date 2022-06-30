import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux/';
import {setIsBirthday} from '../store/birthdaySlice';

import CounterUI from './CounterUI';

const Counter = ({date}) => {
  const dispatch = useDispatch();

  const [remainingTime, setRemainingTime] = useState({});

  const titles = ['days', 'hours', 'minutes', 'seconds'];

  useEffect(() => {
    const obj = setInterval(() => {
      const timeInS = Math.floor(
        (new Date(date) - new Date().getTime()) / 1000,
      );
      const seconds = timeInS % 60;
      const minutes = Math.floor((timeInS / 60) % 60);
      const hours = Math.floor((timeInS / 60 / 60) % 24);
      const days = Math.floor(timeInS / 60 / 60 / 24);
      setRemainingTime({seconds, minutes, hours, days});
    }, 1000);

    return () => {
      clearInterval(obj);
    };
  }, [date]);

  useEffect(() => {
    if (Object.values(remainingTime)[3] <= -1) {
      dispatch(setIsBirthday(true));
    } else {
      dispatch(setIsBirthday(false));
    }
  }, [remainingTime]);

  return (
    <View style={styles.counterContainer}>
      <View style={styles.counter}>
        {titles.map((element, index) => (
          <CounterUI
            title={element}
            key={index}
            time={
              remainingTime[element] > 9
                ? remainingTime[element]
                : remainingTime[element] > 0
                ? '0' + remainingTime[element]
                : '00'
            }
          />
        ))}
      </View>
    </View>
  );
};
export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    paddingVertical: 10,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
