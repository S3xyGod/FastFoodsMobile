import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import colors from '../../untils/colors';
import size, {ScreenWidth, _mph, _mpw} from '../../untils/size';

const HomeOption = props => {
  const {title, description, icon, destination} = props;
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.navigate(destination);
  };

  return (
    <View style={styles.containerItemMenu}>
      <TouchableWithoutFeedback onPress={_onPress}>
        <View style={styles.content}>
          <Image 
          style={styles.iconMenu}
          source={icon}/>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeOption;

const styles = StyleSheet.create({
  containerItemMenu: {
    width: size.ScreenWidth/2 - _mpw(10),
    height: _mph(35),
    marginVertical: _mph(1),
    backgroundColor: colors.Green,
    borderRadius: _mpw(10),
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: _mpw(2)
  },
  content: {
    width: '100%',
    height: _mph(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.Green,
    borderRadius: _mpw(10),
    transform: [{translateX: _mpw(-3)}, {translateY: _mph(-5)}],
  },
  title: {
    width: '80%',
    fontSize: _mpw(14),
    fontWeight: '600',
    color: colors.BLACK,
    textAlign: "center",
    // marginHorizontal: _mpw(5)
  },
  iconMenu:{
    width: '15%',
    height: '80%',
    marginLeft: _mpw(10),
    resizeMode:'stretch',
    justifyContent: "center",
    marginTop: _mph(5)
  }
});
