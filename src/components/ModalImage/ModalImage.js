import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useFormikContext} from 'formik';
import {Button, Dialog, Portal, Modal} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ModalImage({
  ovisible,
  hideOModal,
  name,
  caption = 'UPLOAD',
}) {
  const {values, setFieldValue} = useFormikContext();

  const PickerUserImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 720,
      maxHeight: 1280,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Toast.show({
          text1: 'Give Permission',
          text2: 'Camera not available on device',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1000,
        });
        return;
      } else if (response.errorCode == 'permission') {
        Toast.show({
          text1: 'Give Permission',
          text2: 'Permission not satisfied',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1000,
        });
        return;
      } else if (response.errorCode == 'others') {
        // alert(response.errorMessage);
        return;
      }

      const {assets} = response;

      const imageUri = assets[0].uri;

      hideOModal();

      setFieldValue(name, imageUri);
      Toast.show({
        text1: 'Success',
        text2: 'Image Added Successfully',
        type: 'success',
        position: 'bottom',
        visibilityTime: 1000,
      });
    });
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Toast.show({
          text1: 'Give Permission',
          text2: 'Please Provide Permission',
          type: 'error',
          position: 'bottom',
          visibilityTime: 1000,
        });
      }
      return false;
    } else return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'App needs access to your camera ' + ' so you can take picture',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const CaptureUserImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 720,
      maxHeight: 1280,
      quality: 1,
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Toast.show({
            text1: 'Give Permission',
            text2: 'Camera not available on device',
            type: 'error',
            position: 'bottom',
            visibilityTime: 1000,
          });

          return;
        } else if (response.errorCode == 'permission') {
          Toast.show({
            text1: 'Give Permission',
            text2: 'Permission not satisfied',
            type: 'error',
            position: 'bottom',
            visibilityTime: 1000,
          });
          return;
        } else if (response.errorCode == 'others') {
          //alert(response.errorMessage);
          return;
        }

        const {assets} = response;

        setFieldValue(name, assets[0].uri);
        hideOModal();
        Toast.show({
          text1: 'Success',
          text2: 'Image Added Successfully',
          type: 'success',
          position: 'bottom',
          visibilityTime: 1000,
        });
      });
    }
  };

  return (
    <Portal>
      <Modal
        visible={ovisible}
        onDismiss={hideOModal}
        style={{
          padding: 10,
        }}
        contentContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 12,
        }}>
        <Dialog.Title>{caption}</Dialog.Title>

        <Dialog.Actions
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            //width: '50%',
            paddingBottom: 20,
            paddingTop: 0,
          }}>
          <Button
            style={{width: '100%', borderColor: '#193A66', borderWidth: 1}}
            mode="outlined"
            onPress={() => CaptureUserImage()}
            icon="camera">
            CAPTURE IMAGE FROM CAMERA
          </Button>
          <Button
            onPress={() => PickerUserImage()}
            style={{
              width: '100%',
              borderColor: '#193A66',
              borderWidth: 1,
              marginVertical: 20,
            }}
            mode="outlined"
            icon="camera-image">
            SELECT IMAGE FROM GALLERY
          </Button>
        </Dialog.Actions>
      </Modal>
    </Portal>
  );
}
