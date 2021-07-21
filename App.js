/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigators/AuthNavigator';

function App() {
  return (
    <>
      {/* <StatusBar barStyle="default" backgroundColor="#457b9d" /> */}

      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
}

export default App;
