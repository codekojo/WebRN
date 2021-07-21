import {StyleSheet, Platform} from 'react-native';
import color from '../../config/color';

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: color.lightGrey,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
    marginVertical: 10,

    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: Platform.OS === 'ios' ? 30 : 30,
    fontSize: 16,
    color: color.primaryText,
    paddingVertical: 0,
  },
});
