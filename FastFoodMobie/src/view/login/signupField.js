import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Image, Animated, Easing, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles'
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import config from '../../core/database/configDB';
import MSSQL from 'react-native-mssql';
import { RSA } from 'react-native-rsa-native';
import Spinner from 'react-native-loading-spinner-overlay';
import publicKey from '../../core/key/publicKey'
import privateKey from '../../core/key/privateKey'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignupField = ({func}) => {
    const { t } = useTranslation();
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [rePass, setRePass] = useState('')
    const [passEncoded, setPassEncoded] = useState('')
    const [isConnect, setIsConnect] = useState(false);

    function encodeData(data) {
        // console.log(data);
        RSA.encrypt(data, publicKey)
            .then(encodedMessage => {   //ma hoa
                setPassEncoded(encodedMessage);
                //  console.log(`the encoded message is: ${encodedMessage}`);
                // RSA.decrypt(encodedMessage, privateKey)
                //   .then(decryptedMessage => {   //giai ma
                // console.log(`The original message was: ${decryptedMessage}`);
                // });
            });
    }
    async function checkPhoneOK(phone) {
        const connected = await MSSQL.connect(config);
        const query = `SELECT * FROM Users WHERE phone LIKE '${phone}'`
        const result = await MSSQL.executeQuery(query);
        return result;
    }
    function validateUserName(phone) {
        if (phone.trim().length <= 0) {
            Alert.alert("Có lỗi xảy ra !", "Số điện thoại không hợp lệ");
            return -1;
        } else if (phone.indexOf(' ') > -1) {
            Alert.alert("Có lỗi xảy ra !", "Số điện thoại không hợp lệ");
            return -1;
        } else if (phone.length < 10 || phone.length > 15) {
            Alert.alert("Có lỗi xảy ra !", "Số điện thoại không hợp lệ");
            return -1;
        } if (phone.indexOf("0") != 0) {
            Alert.alert("Có lỗi xảy ra !", "Số điện thoại không hợp lệ");
            return -1;
        } else if (email.trim().length == 0 || 0 > email.trim().length > 100) {
            Alert.alert("Có lỗi xảy ra !", "Email không hợp lệ");
        } else return 0;
    }

    function validateData(pass, rePass) {
        if (pass.length < 6 || pass.length > 20) {
            Alert.alert("Có lỗi xảy ra !", "mật khẩu phải từ 6 đến 20 ký tự");
            return false
        } else if (pass != rePass) {
            Alert.alert("Có lỗi xảy ra !", "Hai trường mật khẩu không giống nhau");
            return false
        } else {
            encodeData(pass)
            return true;
        }
    }
    
    async function handSignUp() {
        var temp2 = validateUserName(userName);
        if (temp2 == -1) {
            return;
        } else {
            const temp3 = validateData(pass, rePass);
            if (temp3 == false) {
                return
            } else {
                setIsConnect(true)
                axios.post("https://fast-food-dev.herokuapp.com/api/user/signup", {
                    "phone": userName,
                    "password": pass,
                    "role": "1",
                    "email": email
                }).then((response) => {
                    setIsConnect(false)
                    Alert.alert("Đăng ký thành công !", "Vui lòng đăng nhập để sử dụng dịch vụ.")
                    func()
                    console.log(response);
                }).catch((error) => {
                    setIsConnect(false)
                    Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại thông tin hoặc kết nối mạng.")
                    console.log(error);
                })
            }
        }

    }
    return (
        <View style={{ alignItems: 'center' }}>
            <Spinner
                visible={isConnect}
                textContent={'Đang đăng ký ...'}
                textStyle={{ color: 'white' }}
            />
            <View
                style={styles.fieldInput}>
                <TextInput
                    placeholder={'Số điện thoại'}
                    style={styles.holderInput}
                    placeholderTextColor='gray'
                    onChangeText={setUserName} />
            </View>
            <View
                style={styles.fieldInput}>
                <TextInput
                    placeholder={t('login:email_address')}
                    style={styles.holderInput}
                    placeholderTextColor='gray'
                    onChangeText={setEmail} />
            </View>
            <View
                style={styles.fieldInput}>
                <TextInput
                    placeholder={t('login:password')}
                    style={styles.holderInput}
                    placeholderTextColor='gray'
                    onChangeText={setPass} />
            </View>
            <View
                style={styles.fieldInput}>
                <TextInput
                    placeholder={t('login:rePassword')}
                    style={styles.holderInput}
                    placeholderTextColor='gray'
                    onChangeText={setRePass} />
            </View>
            <TouchableOpacity
                style={styles.viewBtnLogin}
                onPress={handSignUp}>
                <Text style={styles.textBtnLogin}>{t('login:SignUp')}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignupField