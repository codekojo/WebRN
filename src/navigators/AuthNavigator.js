import React, {useContext} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Onboarding from '../screens/Onboarding';
import Login from '../screens/Signin/Login';
import Signup from '../screens/Signup/Signup';
const AuthNav = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthNav.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: 'white'},
        headerTintColor: 'white',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AuthNav.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
          //animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
      <AuthNav.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthNav.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </AuthNav.Navigator>
  );
}
export default AuthNavigator;
