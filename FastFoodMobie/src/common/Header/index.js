import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import Svg, {SvgXml} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import cart from '../../assets/images/cart.png';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
// import svgs from '../../assets/svgs';
// import TextHeaderLogo from '../../assets/svgs/TextHeaderLogo.svg';
import colors from '../../untils/colors';
import size, { _mph, _mpw } from '../../untils/size';

const Header = props => {
  const {
    navigation,
    onBackPress,
    backBtnEnable = true,
    textHeader = '',
    styleBody = null,
    headerType2 = false,
    buttonLeft,
    buttonRight,
    styleheader,
    iconback,
    textT = 'Personal',
    onPress,
  } = props;
  const handleNavigationGoBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleToggleMenu = () => {
    navigation.toggleDrawer();
  };
  const [num, setNumCart] = useState();
  useEffect(() => {
    function getNum() {
      setNumCart(global.numCart);
      setTimeout(() => {
        getNum()
      }, 1000);
    }
    getNum()
  }, [global.numCart])

  const openCart = () => {
    navigation.navigate(APP_SCREEN_TYPES.CART)
  }


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.viewCart} onPress={openCart} >
          <Image source={cart} style={styles.imgcart} />
          <Text style={{ position: 'absolute', top: -_mpw(5), right: _mph(10), fontSize: _mpw(18), color: 'red', fontWeight: '900', borderColor: 'white', textAlign: 'center' }}>{num}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate(APP_SCREEN_TYPES.HOME)}
        style={styles.logo}>
          <Image
            source={require('../../assets/images/fastfood-white-text.png')}
            style={{ height: _mph(60), width: _mpw(240) }}
            resizeMode='contain' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={handleToggleMenu}>
          <Feather name="menu" size={_mpw(30)} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Green,
  },
  logo: {
    alignSelf: 'center',
  },
  menu: {
    position: 'absolute',
    right: _mpw(10),
    bottom: _mph(10),
  },
  viewCart: {
    position: 'absolute',
    top: _mph(15),
    left: _mpw(10),
  },
  imgcart: {
    height: _mpw(40),
    width: _mpw(40),

  }
});
