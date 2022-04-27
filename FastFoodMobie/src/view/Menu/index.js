import { SafeAreaView, Text, View, Image } from 'react-native';
import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import styles from './styles';
import size, { _mph, _mpw } from '../../untils/size';


const Menu = props => {
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <DrawerItem
          label={t('home:Home')}
          labelStyle={styles.title_1}
          onPress={() => {
            navigation.navigate('Home');
            navigation.closeDrawer();
          }}
        />
        {/* <DrawerItem
          label={t('home:Menu')}
          labelStyle={styles.option_1}
          onPress={() => {
            
          }}
        /> */}
        <DrawerItem
          label={t('home:ProMo')}
          labelStyle={styles.option_1}
          onPress={() => {
            navigation.navigate('Promo');
            navigation.closeDrawer();
          }}
        />
        <DrawerItem
          label={t('home:MyOrder')}
          labelStyle={styles.title_1}
          onPress={() => {
            navigation.navigate(APP_SCREEN_TYPES.ORDED);
            navigation.closeDrawer();
          }}
        />
        {/* <DrawerItem
          label={t('home:Setting')}
          labelStyle={styles.title_1_2}
          onPress={() => { }}
        /> */}
        {/* <DrawerItem
          label={t('home:MyInfor')}
          labelStyle={styles.option_1}
          onPress={() => {
            navigation.navigate(APP_SCREEN_TYPES.EDIT_INFOR);
            navigation.closeDrawer();
          }}
        /> */}
        <DrawerItem
          label={t('home:Logout')}
          labelStyle={styles.title_1_2}
          onPress={() => {
            navigation.navigate(APP_SCREEN_TYPES.LOGIN);
            navigation.closeDrawer();
          }}
        />
      </View>
      <View style={{ alignContent: 'center', marginLeft: _mpw(20), marginBottom: _mph(40) }}>
          <Image
            source={require('../../assets/images/fastfood-logo.png')}
            style={{ height: _mph(200), width: _mpw(180) }}
            resizeMode='stretch' />
        </View>
    </SafeAreaView>
  );
};

export default Menu;

