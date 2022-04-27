import {
    StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable,
    ScrollView, RefreshControl, Alert, TextInput
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Footer from '../../common/Footer'
import { useNavigation } from '@react-navigation/native'
import defaultAvatar from '../../assets/images/fastfood-logo.png'
import size, { _mph, _mpw } from '../../untils/size'
import colors from '../../untils/colors'
import logo from '../../assets/images/logo-base64'
import config from '../../core/database/configDB';
import MSSQL from 'react-native-mssql';
import TextInputDemo from '../../common/TextInputSigup';
import { useTranslation } from 'react-i18next';
import {
    useFocusEffect,
} from '@react-navigation/native';
import { APP_SCREEN_TYPES } from '../../router/screenTypes'
import Entypo from 'react-native-vector-icons/Entypo';
import { RSA } from 'react-native-rsa-native';
import publicKey from '../../core/key/publicKey'
import privateKey from '../../core/key/privateKey'

const changePass = ({ navigation }) => {
    const { t } = useTranslation();
    const [passCu, setPassCu] = useState('')
    const [passMoi, setPassMoi] = useState('')
    const [rePassMoi, setRePassMoi] = useState('')
    const [pass, setPass] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [passEncode, setPassEncode] = useState('')
    const [hidePass, setHidePass] = useState(true)
    const [hidePassMoi, setHidePassMoi] = useState(true)
    const [hideRePassMoi, setHideRePassMoi] = useState(true)
    const [passDecode, setPassDecode] = useState('')
    const [modalSuccess, setModalSuccess] = useState(false)

    useEffect(() => {
        a()
    }, [])
    useEffect(() => {
        encodeData(passMoi)
    }, [passMoi])
    useFocusEffect(
        useCallback(() => {
            a()
        }, []),
    );


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        a();
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }, []);
    function encodeData(data) {
        RSA.encrypt(data, publicKey)
            .then(encodedMessage => {
                setPassEncode(encodedMessage);
            });
    }
    async function a() {
        setPassCu('')
        setPassMoi('')
        setRePassMoi('')
        const connected = await MSSQL.connect(config);
        const query = `SELECT password FROM Users WHERE phone LIKE '${global.phoneNumber}'`
        const result = await MSSQL.executeQuery(query);
        setPass(result[0].password)
        setTimeout(() => {
            getDecode()
        }, 1000);

    }
    async function changeUserPass() {
        const a = validateData();
        if (a == false) {
            console.log("loi");
        } else if (checkPassCu() == false) {
            Alert.alert('Mật khẩu sai !', 'Mật khẩu cũ không đúng.')
        } else {
            const connected = await MSSQL.connect(config);
            const query = `UPDATE Users SET password = '${passEncode}' WHERE phone = '${global.phoneNumber}'`
            const result = await MSSQL.executeUpdate(query);
            if (result != 1) {
                Alert.alert('Có lỗi xảy ra !', 'Xin vui lòng thử lại.')
            } else {
                setModalSuccess(true);
                setTimeout(() => {
                    navigation.navigate(APP_SCREEN_TYPES.EDIT_INFOR)
                    setModalSuccess(false)
                }, 2000);
            }
        }

    }
    function getDecode() {
        RSA.decrypt(pass, privateKey)
            .then(decryptedMessage => {   //giai ma
                setPassDecode(decryptedMessage)
            });

    }
    function validateData() {
        if (passMoi.length < 6 || passMoi.length > 20) {
            console.log("pass <6 hoac >20 ky tu");
            Alert.alert('Mật khẩu quá ngắn !', 'Mật khẩu phải từ 6-20 ký tự.')
            return false
        } else if (passMoi != rePassMoi) {
            Alert.alert('Mật khẩu không khớp !', 'Hai trường mật khẩu mới phải giống nhau.')
            console.log("pass khong giong nhau");
            return false
        } else {
            return true;
        }
    }
    function checkPassCu() {
        if (passCu != passDecode) {
            return false
        } else {
            return true
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
                style={{}}>
                <View style={{ marginTop: _mph(150) }}>
                    <View style={styles.fieldInput}>
                        <TextInput
                            placeholder={'Mật khẩu hiện tại'}
                            style={styles.holderInput}
                            placeholderTextColor='white'
                            onChangeText={setPassCu}
                            secureTextEntry={hidePass}
                            value={passCu} />
                        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
                            <Entypo
                                name={hidePass ? 'eye' : 'eye-with-line'}
                                size={18}
                                style={{ marginRight: _mpw(15) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: _mph(10) }}>
                    <View style={styles.fieldInput}>
                        <TextInput
                            placeholder={'Mật khẩu mới'}
                            style={styles.holderInput}
                            placeholderTextColor='white'
                            onChangeText={setPassMoi}
                            secureTextEntry={hidePassMoi}
                            value={passMoi} />
                        <TouchableOpacity onPress={() => setHidePassMoi(!hidePassMoi)}>
                            <Entypo
                                name={hidePassMoi ? 'eye' : 'eye-with-line'}
                                size={18}
                                style={{ marginRight: _mpw(15) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: _mph(10) }}>
                    <View style={styles.fieldInput}>
                        <TextInput
                            placeholder={'Nhập lại mật khẩu'}
                            style={styles.holderInput}
                            placeholderTextColor='white'
                            onChangeText={setRePassMoi}
                            secureTextEntry={hideRePassMoi}
                            value={rePassMoi} />
                        <TouchableOpacity onPress={() => setHideRePassMoi(!hideRePassMoi)}>
                            <Entypo
                                name={hideRePassMoi ? 'eye' : 'eye-with-line'}
                                size={18}
                                style={{ marginRight: _mpw(15) }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewBtnUpdate}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonUpdate]}
                        onPress={() => {
                            changeUserPass()
                        }}>
                        <Text style={styles.textStyle}>{t('userInfor:changePass')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonUpdate]}
                        onPress={() => {
                            navigation.navigate(APP_SCREEN_TYPES.EDIT_INFOR)

                        }}>
                        <Text style={styles.textStyle}>{t('userInfor:back')}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSuccess}
                onRequestClose={() => {
                    setModalSuccess(!modalSuccess);
                }}>
                <View style={styles.viewModal}>
                    <View style={styles.modalView2}>
                        <View>
                            <Text style={{ color: colors.Black, fontSize: _mpw(18), textAlign: 'center' }}>Thay đổi mật khẩu thành công !</Text>
                        </View>
                        <View style={styles.viewBtnSelect}>
                        </View>
                    </View>
                </View>
            </Modal>
            <Footer />
        </View>
    )
}

export default changePass


const styles = StyleSheet.create({
    viewBtnUpdate: {
        marginTop: _mph(20),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: _mph(10)
    },
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        margin: 5,
        flex: 0.5
    },
    buttonUpdate: {
        backgroundColor: colors.Green,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: _mpw(12),
        lineHeight: _mpw(16)
    },
    fieldInput: {
        flexDirection: 'row',
        height: size.REAL_SIZE_40,
        backgroundColor: colors.Gray3,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: size.REM * 220,
        marginTop: _mph(10),
        width: size.ScreenWidth / 10 * 7
    },
    holderInput: {
        fontSize: 16,
        marginLeft: size.REAL_SIZE_16
    },
    viewModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: '#999999',
    },
    modalView2: {
        width: size.WIDTH / 10 * 7,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        alignContent: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column',
        justifyContent: "center",
        opacity: 1
    },
    viewBtnSelect: {
        flexDirection: 'row'
    },
})