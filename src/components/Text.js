import {StyleSheet, Text} from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';

const AppText = ({children, style}) => {
  const colors = useTheme();
  return (
    <Text style={[styles.text, {color: colors.white}, style]}>{children}</Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
  },
});
