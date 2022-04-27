import React, { useRef, useEffect, useState, useCallback } from 'react'
import { View, Text, Image, Animated, Easing, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles'
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import CheckBox from '@react-native-community/checkbox';
import size, { _mph, _mpw } from '../../untils/size';
import config from '../../core/database/configDB';
import MSSQL from 'react-native-mssql';
import publicKey from '../../core/key/publicKey'
import privateKey from '../../core/key/privateKey'
import { RSA } from 'react-native-rsa-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginField = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('')
  const [pass, setPass] = useState('')
  const [rememberPass, setRememberPass] = useState(false)
  const [hidePass, setHidePass] = useState(true)
  const [isConnect, setIsConnect] = useState(false);


  useFocusEffect(
    useCallback(() => {
      getInfor()
    }, []),
  );


  function validateUserName(phone) {
    if (phone.trim().length <= 0) {
      Alert.alert("Số điện thoại không được để trống");
      return -1;
    } else if (phone.indexOf(' ') > -1) {
      Alert.alert("Số điện thoại không hợp lệ");
      return -1;
    } else if (phone.length < 10 || phone.length > 15) {
      Alert.alert("Số điện thoại không hợp lệ");
      return -1;
    } if (phone.indexOf("0") != 0 && phone.indexOf("+") != 0) {
      Alert.alert("Số điện thoại không hợp lệ");
      return -1;
    } else return 0;
  }
  function checkPass() {
    if (pass.trim().length < 6) {
      console.log("pass it hon 6 kt");
      return -1;
    } else if (pass.length > 20) {
      console.log("pass nhieu hon 20 kt");
      return -1;
    } else {
      return 0;
    }
  }
  async function saveInfor(check) {
    console.log("save");
    if (check == true) {
      try {
        await AsyncStorage.setItem('phone', userName)
        await AsyncStorage.setItem('password', pass)
        await AsyncStorage.setItem('savePass', 'true')
      } catch (e) {
        console.log("error save infor login", e);
      }
    } else {
      try {
        await AsyncStorage.setItem('phone', '')
        await AsyncStorage.setItem('password', '')
        await AsyncStorage.setItem('savePass', 'false')
      } catch (e) {
        console.log("error save infor login", e);
      }
    }

  }
  async function getInfor() {
    console.log("get infor");
    try {
      const savePass = await AsyncStorage.getItem('savePass')
      const phoneGet = await AsyncStorage.getItem('phone')
      const passGet = await AsyncStorage.getItem('password')
      if(savePass == 'true'){
        setUserName(phoneGet)
        setPass(passGet)
        setRememberPass(true)
      }else{
        setUserName(phoneGet)
        setPass(passGet)
        setRememberPass(false)
      }
      
    } catch (e) {
      console.log("error when get", e);
    }
  }
  async function getCart(token) {
    global.numCart = 0;
    const AuthStr = 'Bearer '.concat(token);
    axios.get("https://fast-food-dev.herokuapp.com/api/cart", { headers: { Authorization: AuthStr } })
      .then((response) => {
        if (response.data) {
          // global.numCart = response.data.data.length;
          var temp = 0;
          response.data.data.forEach(x => {
            if (isNaN(x.price) == false) {
              temp += x.quantity
            }
          });
        }
        global.numCart = temp
      }).catch((error) => {
        Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại thông tin đăng nhập hoặc kết nối mạng.")

      })
  }

  async function handLogin() {
    var temp = validateUserName(userName);
    if (temp == -1) {
      return;
    } else {
      var temp3 = checkPass();
      if (temp3 == -1) {
        return;
      } else {
        setIsConnect(true)
        console.log("login");
        axios.post("https://fast-food-dev.herokuapp.com/api/user/signin", {
          "phone": userName,
          "password": pass
        }).then((response) => {
          console.log("GGGGG", response);
          if (response.data.token.length > 0) {
            global.phoneNumber = userName;
            global.token = response.data.token
            getCart(response.data.token)
            saveInfor(rememberPass)
            setIsConnect(false)
            navigation.navigate(APP_SCREEN_TYPES.MENU_DRAWER);
          }
        }).catch((error) => {
          setIsConnect(false)
          Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại thông tin đăng nhập hoặc kết nối mạng.")
          console.log("GGGGG", error);
        })
      }
    }
  }
  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Spinner
          visible={isConnect}
          textContent={'Đang đăng nhập ...'}
          textStyle={{ color: 'white' }}
        />
        <View style={styles.fieldInput}>
          <TextInput
            placeholder={"Số điện thoại"}
            style={styles.holderInput}
            placeholderTextColor='gray'
            onChangeText={setUserName}
            defaultValue={userName} />
        </View>
        <View style={styles.fieldInput}>
          <TextInput
            placeholder={t('login:password')}
            style={styles.holderInput}
            placeholderTextColor='gray'
            onChangeText={setPass}
            defaultValue={pass}
            secureTextEntry={hidePass} />
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Entypo
              name={pass ? 'eye' : 'eye-with-line'}
              size={18}
              style={{ marginRight: _mpw(15) }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewCheckBox}>
          <CheckBox
            disabled={false}
            value={rememberPass}
            onValueChange={(newValue) => setRememberPass(newValue)}
          />
          <View style={styles.viewTextCheckbox}>
            <Text style={styles.labelCheckbox}>{t('login:remember')}</Text>
          </View>

        </View>
        <TouchableOpacity
          style={[styles.viewBtnLogin, { marginTop: _mph(19) }]}
          onPress={handLogin}>
          <Text style={styles.textBtnLogin}>{t('login:login')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default LoginField