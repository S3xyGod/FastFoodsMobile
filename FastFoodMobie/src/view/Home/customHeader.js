import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../common/Header';
import size, {_mpw, _mph} from '../../untils/size';

const CustomHeader = ({navigation}) => {
  const _onPress = () => {
    // navigation.toggleDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header onPress={_onPress} />
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7F50',
  },
  logo: {
    backgroundColor: 'red',
    alignSelf: 'center',
    width: 100,
    height: _mph(20),
  },
  menu: {
    position: 'absolute',
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
});
