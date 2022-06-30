import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../components';

export default function CounterUI({title, time = '00'}) {
  return (
    <View style={styles.counterTiles}>
      <Text style={styles.title}>{title}</Text>
      <Text>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counterTiles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textTransform: 'uppercase',
  },
});
