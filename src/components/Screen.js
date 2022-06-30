import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import useTheme from '../hooks/useTheme';

const Screen = ({children, style}) => {
  const colors = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}, style]}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
