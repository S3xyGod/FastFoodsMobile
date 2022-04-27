import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  viewInput: {
    flexDirection: 'row',
    height: size.REAL_SIZE_40,
    width: widthView === 2 ? size.REM * 180 : size.REM * 220,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: margin,
    justifyContent: 'space-between',
  },
});
