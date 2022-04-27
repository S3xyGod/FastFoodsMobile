import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../untils/colors';
import {_mph, _mpw} from '../../untils/size';

const Button = props => {
  const {title, _onPress} = props;

  return (
    <TouchableOpacity style={styles.button} onPress={_onPress}>
      <Text style={styles.buttonTxt}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: _mpw(200),
    height: _mph(40),
    backgroundColor: colors.BG_COLOR_HEADER,
    borderRadius: 100,
    marginTop: _mph(50),
  },
  buttonTxt: {
    color: colors.WHITE,
    fontSize: _mpw(18),
    fontWeight: '500',
  },
});
