/** @format */
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import color from './color';

export default {
  HeaderTopPadding: {
    paddingTop: 0.1 * height,
    flexGrow: 1,
    marginHorizontal: 25,
    // marginHorizontal: 25,
    //backgroundColor: color.background,
  },
  secondaryLabel: {
    fontSize: 20,
    color: color.secondaryLabel,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 8,
  },
  primaryLabel: {
    fontSize: 25,
    color: color.primaryLabel,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
};
