import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {TouchableRipple, Text as Texty, Button} from 'react-native-paper';

import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import AppText from '../../components/AppText/AppText';
import defaultStyle from '../../config/defaultStyle';
import TextInputWrap from '../../components/InputWrap/TextInputWrap';
import ErrorMessage from '../../components/ErrorComponent/ErrorMessage';
import styles from './style';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().trim().label('Email'),
  password: Yup.string().required().min(3).label('Password'),
});

// Main function
function Login({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const showPassword = <IonIcon name="eye-outline" size={24} color="black" />;

  const hidePassword = (
    <IonIcon name="eye-off-outline" size={24} color="grey" />
  );
  const EyesIcon = (
    <TouchableWithoutFeedback
      onPress={() => setPasswordHidden(!passwordHidden)}>
      {passwordHidden ? hidePassword : showPassword}
    </TouchableWithoutFeedback>
  );

  const handleLogin = async (values, action) => {
    alert('Backend Pending');
  };

  return (
    <AuthWrapper>
      <View style={{flex: 1}}>
        <Formik
          initialValues={{email: '', password: '', NoOTP: 1}}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          {({
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            values,
          }) => (
            <>
              <Text style={defaultStyle.primaryLabel}>Welcome!</Text>
              <Text style={defaultStyle.secondaryLabel}>Login to continue</Text>
              <TextInputWrap label="EMAIL*">
                <AppText
                  styled={{
                    ...styles.customInputBorder,
                    borderColor: `${
                      errors.email && touched.email ? 'red' : 'black'
                    }`,
                  }}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={newEmail => setFieldValue('email', newEmail)}
                  value={values.email}
                  blurOnSubmit={false}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />
              </TextInputWrap>
              <TextInputWrap label="PASSWORD*">
                <AppText
                  styled={{
                    ...styles.customInputBorder,

                    borderColor: `${
                      errors.password && touched.password ? 'red' : 'black'
                    }`,
                  }}
                  placeholder="Password"
                  keyboardType="default"
                  icon={EyesIcon}
                  secureTextEntry={passwordHidden}
                  autoCapitalize="none"
                  //secureTextEntry
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={passwrd => setFieldValue('password', passwrd)}
                  blurOnSubmit={false}
                  value={values.password}
                />
                <ErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
              </TextInputWrap>

              <Button
                contentStyle={{
                  padding: 5,
                  backgroundColor: !(
                    values.email.length !== 0 && values.password.length !== 0
                  )
                    ? '#CFD1CC'
                    : '#rgb(72,194,172)',
                }}
                style={{marginVertical: 10}}
                mode="contained"
                // disabled={isLoading}
                disabled={
                  !(values.email.length !== 0 && values.password.length !== 0)
                }
                labelStyle={{
                  color: !(
                    values.email.length !== 0 && values.password.length !== 0
                  )
                    ? 'grey'
                    : 'black',
                }}
                loading={isLoading}
                onPress={handleSubmit}>
                Login
              </Button>
            </>
          )}
        </Formik>
      </View>

      <View style={styles.wrapSignUp}>
        <Text style={styles.callToActionText}>Not yet registered ?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
          <TouchableRipple
            onPress={() => navigation.navigate('Signup')}
            rippleColor="rgb(72,194,172)"
            style={{
              borderWidth: 1,
              borderColor: '#rgb(72,194,172)',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 13,
              // paddingHorizontal: 30,
              borderRadius: 3,
              flex: 1,
              overflow: 'hidden',
            }}>
            <Texty style={{fontWeight: '700'}}>SIGN UP</Texty>
          </TouchableRipple>
        </View>
      </View>
    </AuthWrapper>
  );
}

export default Login;
