import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import color from '../../config/color';

function TextInputWrap({children, label, customcontainerStyle}) {
  return (
    <View style={[styles.textInputWrap, customcontainerStyle]}>
      <Text style={styles.textLabel}>{label}</Text>
      {children}
    </View>
  );
}

export default TextInputWrap;

const styles = StyleSheet.create({
  textInputWrap: {
    marginTop: 10,
  },
  textLabel: {
    fontSize: 12,
    color: color.inputLabel,
    fontWeight: '500',
  },
});
