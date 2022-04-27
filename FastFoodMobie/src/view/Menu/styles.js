import { StyleSheet } from "react-native";
import size, { _mph, _mpw } from '../../untils/size';
import colors from '../../untils/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: _mpw(5),
      marginTop: _mph(15)
    },
    title_1: {
      color: colors.BG_COLOR_HEADER,
      fontSize: _mpw(20),
      fontWeight: '600',
    },
    option_1: {
      color: colors.BLACK,
      fontSize: _mpw(20),
      fontWeight: '400',
      marginLeft: _mpw(20),
    },
    title_2: {
      color: colors.BG_COLOR_HEADER,
      fontSize: _mpw(20),
      marginLeft: _mpw(40),
      fontWeight: '600',
    },
    option_2: {
      color: colors.BLACK,
      fontSize: _mpw(20),
      fontWeight: '500',
      marginLeft: _mpw(60),
    },
    title_1_2: {
      color: colors.Green,
      fontSize: _mpw(20),
      fontWeight: '600',
    },
  });
export default styles;  