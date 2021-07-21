import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';

import AuthWrapper from '../../components/AuthWrapper/AuthWrapper';
import AppText from '../../components/AppText/AppText';
import TextInputWrap from '../../components/InputWrap/TextInputWrap';
import ErrorMessage from '../../components/ErrorComponent/ErrorMessage';

import styles from './style';
import defaultStyle from '../../config/defaultStyle';
import ModalImage from '../../components/ModalImage/ModalImage';
import ViewPortal from '../../components/ViewPortal/ViewPortal';

const validationSchema = Yup.object().shape({
  fName: Yup.string().required().trim().label('First Name'),
  lName: Yup.string().required().trim().label('Last Name'),
  email: Yup.string().required().email().trim().label('Email'),
  password: Yup.string()
    .min(3, 'Password must be greater than 3')
    .required()
    .label('Password'),
  confirmPassword: Yup.string()
    .required()
    .label('Confirm Password')
    .test(
      'confirm-password-test',
      'Password and confirm password should match',
      function (value) {
        return value === this.parent.password;
      },
    ),
});

function Signup({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectPicture, selectPictureName] = useState('');
  const [uploadCaption, setUploadCaption] = useState('UPLOAD');

  const [ovisible, setOVisible] = useState(false);
  const hideOModal = () => setOVisible(false);

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setconfirmPasswordHidden] = useState(true);

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
  const EyesIcons = (
    <TouchableWithoutFeedback
      onPress={() => setconfirmPasswordHidden(!confirmPasswordHidden)}>
      {confirmPasswordHidden ? hidePassword : showPassword}
    </TouchableWithoutFeedback>
  );

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [currentViewDetails, setViewDetails] = useState('');
  const hideDetailsModal = () => setDetailsVisible(false);

  const handleLogin = async values => {
    //Check for internet connection before sending post requests

    return alert('Posting Data');
  };

  return (
    <AuthWrapper>
      <View style={{flex: 1}}>
        <Formik
          initialValues={{
            email: '',
            fName: '',
            lName: '',
            password: '',
            confirmPassword: '',
            selfie: '',
          }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
            values,
          }) => (
            <>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" color="black" size={25} />
              </TouchableOpacity>
              <Text style={defaultStyle.primaryLabel}>Sign up</Text>

              <TextInputWrap label="FIRST NAME*">
                <AppText
                  styled={{
                    ...styles.customInputBorder,
                    borderColor: `${
                      errors.fName && touched.fName ? 'red' : 'black'
                    }`,
                  }}
                  placeholder="First Name"
                  keyboardType="default"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('fName')}
                  onChangeText={handleChange('fName')}
                  blurOnSubmit={false}
                />
                <ErrorMessage error={errors.fName} visible={touched.fName} />
              </TextInputWrap>

              {/* Last Name Container */}
              <TextInputWrap label="LAST NAME*">
                <AppText
                  styled={{
                    ...styles.customInputBorder,
                    borderColor: `${
                      errors.lName && touched.lName ? 'red' : 'black'
                    }`,
                  }}
                  placeholder="Last Name"
                  keyboardType="default"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('lName')}
                  onChangeText={handleChange('lName')}
                  blurOnSubmit={false}
                />
                <ErrorMessage error={errors.lName} visible={touched.lName} />
              </TextInputWrap>

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
                  onChangeText={handleChange('email')}
                  blurOnSubmit={false}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />
              </TextInputWrap>

              {/* Phone Number Wrapper */}
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
                  autoCapitalize="none"
                  // secureTextEntry
                  icon={EyesIcon}
                  secureTextEntry={passwordHidden}
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  blurOnSubmit={false}
                />
                <ErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
              </TextInputWrap>
              <TextInputWrap label="CONFIRM PASSWORD*">
                <AppText
                  styled={{
                    ...styles.customInputBorder,
                    borderColor: `${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'red'
                        : 'black'
                    }`,
                  }}
                  placeholder="Confirm Password"
                  keyboardType="default"
                  autoCapitalize="none"
                  //secureTextEntry
                  icon={EyesIcons}
                  secureTextEntry={confirmPasswordHidden}
                  underlineColorAndroid="transparent"
                  onBlur={() => setFieldTouched('confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  blurOnSubmit={false}
                />
                <ErrorMessage
                  error={errors.confirmPassword}
                  visible={touched.confirmPassword}
                />
              </TextInputWrap>

              <View style={{...styles.customInputWidth}}>
                <TextInputWrap label="UPLOAD SELFIE*">
                  {values.selfie ? (
                    <Button
                      contentStyle={{
                        padding: 5,
                        backgroundColor: '#9CC3D5FF',
                      }}
                      icon="gesture-tap"
                      style={{marginTop: 10}}
                      mode="contained"
                      onPress={() => {
                        setDetailsVisible(true);
                        setViewDetails(values.selfie);
                        selectPictureName('selfie');
                        setUploadCaption('SELFIE');
                      }}>
                      View Selfie
                    </Button>
                  ) : (
                    <Button
                      style={{marginTop: 10}}
                      icon="upload"
                      contentStyle={{
                        padding: 5,
                        backgroundColor: '#9CC3D5FF',
                      }}
                      onPress={() => {
                        setOVisible(true);
                        selectPictureName('selfie');
                        setUploadCaption('UPLOAD SELFIE');
                      }}>
                      UPLOAD
                    </Button>
                  )}
                  <ErrorMessage
                    error={errors.selfie}
                    visible={touched.selfie}
                  />
                </TextInputWrap>
              </View>

              <Button
                contentStyle={{
                  padding: 5,
                  backgroundColor: !(
                    values.fName.length !== 0 &&
                    values.lName.length !== 0 &&
                    values.email.length !== 0 &&
                    values.password.length !== 0 &&
                    values.confirmPassword.length !== 0
                  )
                    ? '#CFD1CC'
                    : '#rgb(72,194,172)',
                }}
                style={{marginVertical: 10}}
                mode="contained"
                // disabled={isLoading}
                disabled={
                  isLoading ||
                  !(
                    values.fName.length !== 0 &&
                    values.lName.length !== 0 &&
                    values.email.length !== 0 &&
                    values.password.length !== 0 &&
                    values.confirmPassword.length !== 0
                  )
                }
                labelStyle={{
                  color: !(
                    values.fName.length !== 0 &&
                    values.lName.length !== 0 &&
                    values.email.length !== 0 &&
                    values.password.length !== 0 &&
                    values.confirmPassword.length !== 0
                  )
                    ? 'grey'
                    : 'black',
                }}
                loading={isLoading}
                onPress={handleSubmit}>
                Sign up
              </Button>

              <ModalImage
                ovisible={ovisible}
                hideOModal={hideOModal}
                name={selectPicture}
                caption={uploadCaption}
              />

              <ViewPortal
                detailsVisible={detailsVisible}
                hideDetailsModal={hideDetailsModal}
                name={selectPicture}
                selfie={currentViewDetails}
                caption={uploadCaption}
              />
            </>
          )}
        </Formik>
      </View>
    </AuthWrapper>
  );
}

export default Signup;
