import React from 'react';
import {Text, StyleSheet} from 'react-native';
import color from '../../config/color';

function ErrorMessage({error, visible}) {
  if (!visible || !error) return null;
  return <Text style={styles.errorTextStyle}>{error}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  errorTextStyle: {
    color: color.error,
  },
});
