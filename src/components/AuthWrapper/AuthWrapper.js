import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import color from '../../config/color';
import defaultStyle from '../../config/defaultStyle';

function AuthWrapper({children, styled}) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        bounces={false}
        contentContainerStyle={[defaultStyle.HeaderTopPadding, styled]}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
}

export default AuthWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
});
