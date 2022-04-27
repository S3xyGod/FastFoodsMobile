import {
    StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable,
    ScrollView, RefreshControl, Alert,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { useNavigation } from '@react-navigation/native'
import defaultAvatar from '../../assets/images/fastfood-logo.png'
import size, { _mph, _mpw } from '../../untils/size'
import colors from '../../untils/colors'
import edit from '../../assets/images/edit.png'
import logo from '../../assets/images/logo-base64'
import ImagePicker from 'react-native-image-crop-picker';
import closeBtn from '../../assets/images/close.png'
import config from '../../core/database/configDB';
import MSSQL from 'react-native-mssql';
import TextInputDemo from '../../common/TextInputSigup';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import DatePicker from 'react-native-date-picker'
import { useTranslation } from 'react-i18next';
import {
    useFocusEffect,
} from '@react-navigation/native';
import calendar from '../../assets/images/calendar.png'
import axios from 'axios';

const EditInfor = ({ navigation }) => {
    const { t } = useTranslation();
    var [userInfor, setUserInfor] = useState([])
    const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
    const [showLich, setShowLich] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const getDate18yearAgo = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear() - 18;

        return year + '-' + month + '-' + date;
    }

    const openPickerImage = () => ImagePicker.openPicker({
        width: 640,
        height: 640,
        cropping: true,
        includeBase64: true,
        compressImageMaxWidth: 640,
        compressImageMaxHeight: 640,
    }).then(image => {
        // console.log(image.cropRect.data);
        userInfor.avatar = `data:${image.mine};base64,${image.data}`
        setModalChangeAvatar(false);
    });

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 640,
            height: 640,
            cropping: true,
            includeBase64: true,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 640,
        }).then(image => {
            // console.log(image.data);
            // setAvatar(`data:${image.mine};base64,${image.data}`);
            userInfor.avatar = `data:${image.mine};base64,${image.data}`
            setModalChangeAvatar(false);
            // updateUserInfor(image.mine, image.data, global.phoneNumber)
        });
    }
    async function updateUserInfor() {
        const connected = await MSSQL.connect(config);
        const query = `UPDATE Users SET avatar = '${userInfor.avatar}', first_name = N'${userInfor.first_name}', last_name = N'${userInfor.last_name}', address = N'${userInfor.address}' ,email = '${userInfor.email}', birthOfDate = '${userInfor.birthOfDate}'  WHERE phone = ${global.phoneNumber};`
        const result = await MSSQL.executeUpdate(query);
        if(result == 1){
            Alert.alert('Cập nhật thành công !', '')
        }else{
            Alert.alert('Cập nhật thất bại !', 'Có lỗi xảy ra xin vui lòng thử lại sau')
        }
        onRefresh()
    }

    async function a() {
        const connected = await MSSQL.connect(config);
        const query = `SELECT * FROM Users WHERE phone LIKE '${global.phoneNumber}'`
        const result = await MSSQL.executeQuery(query);
        console.log("get infor OK");
        setUserInfor(result[0])
    }
    useFocusEffect(
        useCallback(() => {
            onRefresh()
        }, []),
      );
    useEffect(() => {
        onRefresh();
    }, [])
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        a();
        setTimeout(() => {
            setRefreshing(false)
        }, 2000);
    }, []);




    return (
        <View style={styles.cotainer}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>
                <TouchableOpacity
                    style={styles.viewAvatar}
                    onPress={() => console.log("Show")}>
                    <Image source={userInfor.avatar != 0 ? { uri: `${userInfor.avatar}` } : { uri: `${logo}` }} style={styles.imgAvatar} />
                    <TouchableOpacity
                        style={styles.viewEditAvatar}
                        onPress={() => setModalChangeAvatar(!modalChangeAvatar)}>
                        <Image source={edit} style={styles.editAvatar} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.viewinput}>
                <TextInputDemo
                        text={t('userInfor:sdt')}
                        defaultValue={userInfor.first_name ? userInfor.phone: ''}
                        placeholder={t('userInfor:sdt')}
                        onChangeText={(text) => {
                            // userInfor.first_name = text
                        }}
                        buttonRight={true}
                    />
                    <TextInputDemo
                        text={t('userInfor:fisrtName')}
                        defaultValue={userInfor.first_name ? userInfor.first_name : ''}
                        placeholder={t('userInfor:fisrtName')}
                        onChangeText={(text) => {
                            userInfor.first_name = text
                        }}
                    />
                    <TextInputDemo
                        text={t('userInfor:lastName')}
                        placeholder={t('userInfor:lastName')}
                        defaultValue={userInfor.last_name ? userInfor.last_name : ''}
                        onChangeText={(text) => userInfor.last_name = text}
                    />
                    <TextInputDemo
                        text={t('userInfor:address')}
                        placeholder={t('userInfor:address')}
                        defaultValue={userInfor.address ? userInfor.address : ''}
                        onChangeText={(text) => userInfor.address = text}
                    />
                    <TextInputDemo
                        text={t('userInfor:email')}
                        placeholder={t('userInfor:email')}
                        defaultValue={userInfor.email ? userInfor.email : ''}
                        onChangeText={(text) => userInfor.email = text}
                    />
                    <TouchableOpacity
                        onPress={() => setShowLich(!showLich)}
                    >
                        <TextInputDemo
                            text={t('userInfor:birthday')}
                            placeholder={t('userInfor:birthday')}
                            buttonRight={true}
                            value={userInfor.birthOfDate}
                            img={calendar}
                        />
                    </TouchableOpacity>


                </View>
                <View style={{ marginTop: _mph(15) }}>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonUpdate]}
                        onPress={() => {
                            // console.log(userInfor);
                            updateUserInfor()
                        }}>
                        <Text style={styles.textStyle}>{t('userInfor:update')}</Text>
                    </TouchableOpacity>
                    <View style={styles.viewBtnUpdate}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonUpdate]}
                            onPress={() => {
                                navigation.navigate(APP_SCREEN_TYPES.CHANGE_PASS)
                            }}>
                            <Text style={styles.textStyle}>{t('userInfor:changePass')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonUpdate]}
                            onPress={() => {
                                navigation.navigate(APP_SCREEN_TYPES.HOME)
                            }}>
                            <Text style={styles.textStyle}>{t('userInfor:back')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalChangeAvatar}
                onRequestClose={() => {
                    setModalChangeAvatar(!modalChangeAvatar);
                }}>
                <View style={styles.viewModal}>
                    <View style={styles.modalView2}>
                        <View style={styles.viewBtnSelect}>
                            <Pressable
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => {
                                    openCamera();
                                }}>
                                <Text style={styles.textStyle}>Chụp ảnh mới</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => {
                                    openPickerImage();
                                }}>
                                <Text style={styles.textStyle}>Chọn từ thư viện</Text>
                            </Pressable>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalChangeAvatar(false)
                            }}
                            style={{ position: 'absolute', right: 5, top: 5 }}>
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                source={closeBtn}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <DatePicker
                modal
                open={showLich}
                date={new Date}
                maximumDate={new Date}
                //
                mode='date'
                onConfirm={(date) => {
                    console.log(date.toISOString().slice(0, 10))
                    userInfor.birthOfDate = date.toISOString().slice(0, 10)
                    setShowLich(false)
                }}
                onCancel={() => {
                    setShowLich(false)
                }}
            />
            <Footer />
        </View>
    )
}

export default EditInfor

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        alignItems: 'center',
    },
    viewAvatar: {
        height: _mpw(200),
        width: _mpw(200),
        marginTop: _mph(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgAvatar: {
        height: _mpw(200),
        width: _mpw(200),
        borderColor: colors.Green,
        borderWidth: 1,
        resizeMode: 'stretch',
    },
    viewEditAvatar: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: _mpw(10),
        right: _mpw(10),
    },
    editAvatar: {
        height: _mpw(20),
        width: _mpw(20),
    },
    viewModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#999999',
    },
    modalView2: {
        width: size.WIDTH / 10 * 7,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: "center",
        opacity: 1
    },
    viewBtnSelect: {
        flexDirection: 'row'
    },
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        margin: 5,
        flex: 0.5
    },
    buttonClose: {
        backgroundColor: "#2959a9",
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
    viewinput: {
        marginTop: _mph(5)
    },
    viewBtnUpdate: {
        marginTop: _mph(2),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: _mph(10)
    }
})