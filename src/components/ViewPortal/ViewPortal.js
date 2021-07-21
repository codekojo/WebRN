import React from 'react';
import {Image} from 'react-native';
import {Button, Dialog, Portal, Modal} from 'react-native-paper';
import {useFormikContext} from 'formik';
import Toast from 'react-native-toast-message';

const ViewPortal = ({
  detailsVisible,
  hideDetailsModal,
  name,
  selfie,
  caption = 'View',
}) => {
  const {values, setFieldValue} = useFormikContext();

  function handleRemove() {
    hideDetailsModal();
    setTimeout(() => {
      setFieldValue(name, '');
    }, 100);

    Toast.show({
      text1: 'Success',
      text2: 'Removed Successfully',
      type: 'info',
      position: 'bottom',
      visibilityTime: 1000,
    });
  }

  return (
    <Portal>
      <Modal
        visible={detailsVisible}
        onDismiss={hideDetailsModal}
        style={{
          padding: 10,
        }}
        contentContainerStyle={{
          backgroundColor: '#fff',
          borderRadius: 12,
        }}>
        <Dialog.Title>{caption}</Dialog.Title>

        <Image
          source={{uri: selfie}}
          style={{
            width: 120 * 2,
            height: 160 * 2,
            alignSelf: 'center',
            margin: 20,
            // transform: [{ rotate: '270deg' }],
          }}
        />
        <Dialog.Actions
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: 20,
            paddingTop: 0,
          }}>
          <Button
            mode="outlined"
            onPress={handleRemove}
            style={{width: '50%', borderWidth: 1, marginVertical: 5}}>
            Remove
          </Button>
          <Button
            mode="outlined"
            onPress={hideDetailsModal}
            style={{width: '50%', borderWidth: 1}}>
            Okay
          </Button>
        </Dialog.Actions>
      </Modal>
    </Portal>
  );
};

export default ViewPortal;
