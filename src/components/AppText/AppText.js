import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './style';

function AppText({styled, mo, icon, ...args}) {
  const iconAvailable = {
    width: icon ? '90%' : '100%',
  };
  return (
    <View style={[styles.container, styled]}>
      <TextInput
        {...args}
        placeholderTextColor="grey"
        style={[styles.textInput, mo, iconAvailable]}
      />
      {icon && icon}
    </View>
  );
}

export default AppText;
