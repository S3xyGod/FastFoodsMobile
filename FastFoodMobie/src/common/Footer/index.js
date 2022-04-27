import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../untils/colors';
import {WIDTH, _mph, _mpw} from '../../untils/size';

const Footer = () => {
  const {t} = useTranslation();

  return (
    <View style={{backgroundColor: colors.Green,}}>
    <View style={styles.footer}>
      <Text style={{lineHeight:_mph(14), textAlign: 'center', marginHorizontal: _mph(5), paddingTop: _mpw(10), color: colors.White, color: colors.WHITE}}>Quý khách mua số lượng lớn vui lòng liên hệ với chúng tôi qua số điện thoại 0123456789</Text>
    </View>
    <View>
      <Text style={[styles.footerTxt, {paddingRight: _mpw(20)}]}>{t('home:PrivacyPolicy')}</Text>

    </View></View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    // position: 'absolute',
    // bottom: 0,
    width: WIDTH,
    // height: _mph(50),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: _mph(5),
    backgroundColor: colors.Green,
  },
  footerTxt: {
    color: colors.WHITE,
    fontSize: _mpw(16),
    fontWeight: '500',
    textAlign: 'right'
  },
});
