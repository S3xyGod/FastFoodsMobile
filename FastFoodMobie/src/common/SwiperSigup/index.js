import React from 'react';

import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {images} from '../../assets/images';
import colors from '../../untils/colors';
import size from '../../untils/size';
import {styles} from './style';

const SwiperSigup = props => {
  const {marginTop = Number, text = Number, onPress = Object} = props;
  return (
    <View
      style={{
        flexDirection: 'row',

        marginTop: marginTop,
        marginHorizontal: size.REAL_SIZE_40,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touch,
          {
            backgroundColor:
              text === 1 ? colors.BG_COLOR_HEADER : colors.SWIPERSIGUP,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.WHITE,
            marginTop: size.REAL_SIZE_6,
          }}>
          1
        </Text>
      </TouchableOpacity>
      <Text
        style={{marginTop: size.REAL_SIZE_6, color: colors.BG_COLOR_HEADER}}>
        ---------
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touch,
          {
            backgroundColor:
              text === 2 ? colors.BG_COLOR_HEADER : colors.SWIPERSIGUP,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.WHITE,
            marginTop: size.REAL_SIZE_6,
          }}>
          2
        </Text>
      </TouchableOpacity>
      <Text
        style={{marginTop: size.REAL_SIZE_6, color: colors.BG_COLOR_HEADER}}>
        ---------
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touch,
          {
            backgroundColor:
              text === 3 ? colors.BG_COLOR_HEADER : colors.SWIPERSIGUP,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.WHITE,
            marginTop: size.REAL_SIZE_6,
          }}>
          3
        </Text>
      </TouchableOpacity>
      <Text
        style={{marginTop: size.REAL_SIZE_6, color: colors.BG_COLOR_HEADER}}>
        ---------
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touch,
          {
            backgroundColor:
              text === 4 ? colors.BG_COLOR_HEADER : colors.SWIPERSIGUP,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.WHITE,
            marginTop: size.REAL_SIZE_6,
          }}>
          4
        </Text>
      </TouchableOpacity>
      <Text
        style={{marginTop: size.REAL_SIZE_6, color: colors.BG_COLOR_HEADER}}>
        ---------
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.touch,
          {
            backgroundColor:
              text === 5 ? colors.BG_COLOR_HEADER : colors.SWIPERSIGUP,
          },
        ]}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.WHITE,
            marginTop: size.REAL_SIZE_6,
          }}>
          5
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SwiperSigup;
