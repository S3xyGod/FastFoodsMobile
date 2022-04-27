import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import size, {FontText10, WIDTH} from '../../untils/size';
import colors from '../../untils/colors';
import {APP_SCREEN_TYPES} from '../../router/screenTypes';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

const BottomTab = props => {
  const {
    nameIcon = false,
    titleIcon = false,
    setting = false,
    saves = false,
    deleteIcon = false,
    IconOnBack = false,
    cameras = false,
    _onSaves = Function,
    _onDelete = Function,
    _onCamera = Function,

    _onBack = Function,
    onPressHome = Function,
  } = props;
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BG_COLOR_HEADER,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: WIDTH,
      }}>
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center'}}
        onPress={() => {
          navigation.navigate(APP_SCREEN_TYPES.HOME);
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: FontText10,
          }}>
           {t('bottomTab:home')}
        </Text>
        <AntDesign
          name="home"
          size={25}
          color="#fff"
          style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
        />
      </TouchableOpacity>
      {IconOnBack && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={_onBack}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: FontText10,
            }}>
            {t('bottomTab:onback')}
          </Text>
          <Entypo
            name="ccw"
            size={25}
            color="#fff"
            style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
          />
        </TouchableOpacity>
      )}

      {setting && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            navigation.navigate(APP_SCREEN_TYPES.SETTING);
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: FontText10,
            }}>
            {t('bottomTab:setting')}
          </Text>
          <AntDesign
            name="setting"
            size={25}
            color="#fff"
            style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
          />
        </TouchableOpacity>
      )}
      {saves && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={_onSaves}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: FontText10,
            }}>
            {t('bottomTab:save')}
          </Text>
          <IonIcons
            name="download-outline"
            size={25}
            color={colors.WHITE}
            style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
          />
        </TouchableOpacity>
      )}
   {cameras && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={_onCamera}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: FontText10,
            }}>
            {t('bottomTab:camera')}
          </Text>
          <AntDesign
            name="camerao"
            size={25}
            color="#fff"
            style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
          />
        </TouchableOpacity>
      )}
      {deleteIcon && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={_onDelete}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontSize: FontText10,
            }}>
            {t('bottomTab:delete')}
          </Text>
          <AntDesign
            name="delete"
            size={25}
            color="#fff"
            style={{alignContent: 'center', marginTop: size.REAL_SIZE_5}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default BottomTab;
