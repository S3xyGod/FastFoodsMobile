import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import colors from '../../untils/colors';
import size, { _mph, _mpw } from '../../untils/size';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { t } from 'i18next';
import Entypo from 'react-native-vector-icons/Entypo';
import calendar from '../../assets/images/calendar.png'
import DatePicker from 'react-native-date-picker'

const TextInputSigup = (props) => {
  const [date, setDate] = useState(new Date());
  const [hidePass, setHidePass] = useState(false)
  const {
    text,
    placeholder,
    buttonLeft,
    buttonRight,
    margin,
    widthView = 1,
    widths = Number,
    onChangeText,
    isPass,
    value,
    defaultValue,
    img
  } = props;
  return (
    <View style={{}}>
      {text ? (<View>
        <Text
          style={{
            // marginTop: 10,
            color: colors.BLACK,
            fontSize: 16,
            marginLeft: size.REAL_SIZE_10,
          }}>
          {text}
        </Text>
      </View>) : null}
      <View
        style={[
          {
            flexDirection: 'row',
            height: size.REAL_SIZE_40,
            backgroundColor: colors.Gray3,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width:
              widthView === 2
                ? size.REM * 180
                : widthView === 3
                  ? size.REM * 205
                  : size.REM * 220,
            marginLeft: margin,
          },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {buttonLeft ? (
            <TouchableOpacity style={{ marginLeft: size.REAL_SIZE_10 }}>
              <Fontisto name="date" size={15} />
            </TouchableOpacity>
          ) : null}
          <TextInput
            placeholder={placeholder}
            style={{ fontSize: 16, marginLeft: size.REAL_SIZE_16, color: 'black' }}
            placeholderTextColor='white'
            onChangeText={onChangeText}
            // secureTextEntry={hidePass}
            value={value}
            defaultValue={defaultValue}
            editable={buttonRight != true ? true : false}
          />
          {/* {isPass && (
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              <Entypo
                name={'pass' ? 'eye' : 'eye-with-line'}
                size={18}
                style={{ position: 'absolute', right: _mpw(15) }}
              />
            </TouchableOpacity>
          )} */}
        </View>

        {buttonRight ? (
          <View>
            {img ? (
              <Image source={img} style={{ width: _mpw(20), height: _mpw(20), marginRight: _mpw(10) }} />
            ) : (null)}
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default TextInputSigup;
