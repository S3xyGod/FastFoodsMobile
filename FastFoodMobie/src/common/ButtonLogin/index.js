import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import colors from '../../untils/colors';
import size, {FontText16, FontText18} from '../../untils/size';
const ButtonLogin = props => {
  const {txtButton, onPressButton, marginTop, confirm, colorBT} = props;
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: marginTop,
      }}>
      <TouchableOpacity
        onPress={onPressButton}
        style={{
          height: confirm ? size.REAL_SIZE_40 : size.REAL_SIZE_50,
          width: confirm ? size.REAL_SIZE_108 : size.REM * 150,
          backgroundColor: colorBT ? '#c71b00' : colors.BG_COLOR_HEADER,

          borderRadius: 25,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: confirm ? size.REAL_SIZE_8 : size.REAL_SIZE_14,
            fontSize: colorBT ? FontText16 : FontText18,
            color: colors.WHITE,
          }}>
          {txtButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ButtonLogin;
