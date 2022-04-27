import React, { useRef, useEffect, useState } from 'react'
import {
  View, Text, Image, Animated, Easing, TouchableOpacity,
  Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next';
import styles from './styles'
import * as Animatable from 'react-native-animatable';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import LoginField from './loginField';
import SignupField from './signupField';


const Login = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true)
  const [rememberPass, setRememberPass] = useState(false)


  const handSignUpNow = () => {
    // navigation.navigate(APP_SCREEN_TYPES.SIGN_UP)
    setIsLogin(false)
  }
  const handLogInNow = () => {
    // navigation.navigate(APP_SCREEN_TYPES.SIGN_UP)
    setIsLogin(true)
  }
  const switchLayout = () => {
    
    setIsLogin(!isLogin)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>

        <Animatable.Image
          source={require('../../assets/images/fastfood-logo.png')}
          style={styles.imageLogin}
          animation='fadeInUp'
          iterationCount={1}
        />
        {isLogin ? (
          <View>
            <LoginField />
            <View style={styles.viewSignUp}>
              <Text style={styles.textDontHaveAcc}>{t('login:DontHaveAccount')}</Text>
              <TouchableOpacity style={styles.viewTextSignUp}
                onPress={handSignUpNow}>
                <Text style={styles.textSignUp}>{t('login:SignUpNow')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <SignupField func={switchLayout}/>
            <View style={styles.viewSignUp}>
              <Text style={styles.textDontHaveAcc}>{t('login:HaveAccount')}</Text>
              <TouchableOpacity style={styles.viewTextSignUp}
                onPress={handLogInNow}>
                <Text style={styles.textSignUp}>{t('login:SignInNow')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Login