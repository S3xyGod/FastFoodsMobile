import {
    StyleSheet, Text, View, ScrollView, Modal,
    RefreshControl, TextInput, FlatList, Image, TouchableOpacity, Alert
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import size, { _mph, _mpw } from '../../untils/size'
import colors from '../../untils/colors'
import config from '../../core/database/configDB'
import MSSQL from 'react-native-mssql';
import Footer from '../../common/Footer';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import SpinnerButton from 'react-native-spinner-button';
import ckecked from '../../assets/images/checked.png'
import { APP_SCREEN_TYPES } from '../../router/screenTypes'
import { RadioButton } from 'react-native-paper';
import RNMomosdk from 'react-native-momosdk';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import axios from 'axios';

const preOrder = ({ navigation }) => {
    var [dataCart, setDatacart] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    var [tongTien, setTongTien] = useState(0);
    var [giamGia, setGiamGia] = useState(0);
    var [thanhTien, setThanhTien] = useState(0);
    const [promoInput, setPromoInput] = useState('');
    const [promoAdded, setPromoAdded] = useState(false)
    const [moTa, setMoTa] = useState('');
    const [loadPro, setLoadPro] = useState(false)
    const [diaChi, setDiaChi] = useState('');
    const [paymentAfter, setPaymentAfter] = useState(true)
    const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
    const [afterPayment, setAfterPayment] = useState(false)
    const [paymentOK, setPaymentOK] = useState(false)
    const [item, setItem] = useState([]);
    const [checkItemOK, setCheckItemOK] = useState(true)
    const [idSelected, setIdSelected] = useState()
    const [idPayment, setIdPayment] = useState("");
    const [nameShip, setNameShip] = useState('')

    useFocusEffect(
        useCallback(() => {
            setCheckItemOK(true)
            onRefresh()
            // setPromoInput('')
            getTongTien()
            // setNameShip('')
        }, []),
    );
    useEffect(() => {
        setCheckItemOK(true)
        getTongTien();
        // setNameShip('')
    }, [refreshing])

    useEffect(() => {
        onRefresh()
        // setPromoInput('')
        // setNameShip('')
    }, [])
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCart()
        fetchData()
        setLoadPro(false)
        setNameShip('')
        setPromoInput('')
        setDiaChi('')
    }, []);

    async function fetchData() {
        setThanhTien(0)
        const AuthStr = 'Bearer '.concat(global.token);
        axios.get("https://fast-food-dev.herokuapp.com/api/cart", { headers: { Authorization: AuthStr } })
            .then((response) => {
                if (response.data) {
                    //convertData(response.data.data);
                    var aaa = response.data.data.filter(e => isNaN(e.price) == false)
                    setDatacart(aaa)
                    setRefreshing(false);
                }
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại thông tin đăng nhập hoặc kết nối mạng.")
                console.log('err', error);
                setRefreshing(false);
            })
    }

    function sendNoti() {
        PushNotification.configure({});
        PushNotification.createChannel(
            {
                channelId: "channel-success", // (required)
                channelName: "Wellcom", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.localNotification({
            channelId: "channel-success",
            autoCancel: true,
            largeIcon: "ic_launcher",
            smallIcon: "ic_launcher",
            color: "green",
            vibrate: true,
            vibration: 300,
            title: "Gọi món thành công",
            message: "Hãy chú ý điện thoại để xác nhận đơn hàng và nhận món ngon từ bác tài nhé",
            playSound: true,
            soundName: "default",
            // actions: ["Accept", "Reject"],
        });
    }

    async function getCart() {
        console.log("87777");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
        }
        axios.get(`https://fast-food-dev.herokuapp.com/api/cart`, {
            headers: headers
        }).then((response) => {
            if (response.data) {
                // global.numCart = response.data.data.length;
                var temp = 0;
                response.data.data.forEach(x => {
                    if (isNaN(x.price) == false) {
                        temp += x.quantity
                    }
                });
            }
            console.log("56666");
            global.numCart = temp
        }).catch((error) => {
            console.log("69999", error);
        })
    }
    async function getTongTien() {
        setTongTien(0);
        var tien = 0;
        dataCart.forEach(e => {
            if (isNaN(e.price) == false) {
                tien += new Number(e.price) * new Number(e.quantity);
            }
        });
        setTongTien(tien);
        if (giamGia > tien) {
            setThanhTien(0)
        } else {
            setThanhTien(tien - giamGia)
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
        }
        axios.get(`https://fast-food-dev.herokuapp.com/api/cart`, {
            headers: headers
        }).then((response) => {
            if (response.data) {
                setItem(response.data.data);
            }
        }).catch((error) => {
        })


        checkNumItem()
    }
    async function addPromo() {
        if (promoInput.trim().length == 0 || promoAdded == true) {
            setGiamGia(0)
            setThanhTien(tongTien)
            setPromoAdded(false)
        } else {
            console.log("88888");
            setLoadPro(true)

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${global.token}`
            }
            const url = `https://fast-food-dev.herokuapp.com/api/sales`;
            axios.get(url, {
                headers: headers
            }).then((response) => {
                console.log("12345", response.data);
                response.data.data.forEach(x => {
                    if (x.code == promoInput.trim()) {
                        var tg = x.description;
                        setGiamGia(tg);
                        if (tongTien < tg) {
                            setThanhTien(0)
                            setPromoAdded(true)
                            setMoTa(x.name)
                        } else {
                            setThanhTien(tongTien - tg)
                            setPromoAdded(true)
                            setMoTa(x.name)
                        }

                    }
                    setLoadPro(false)
                });
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
                console.log("00000", error);
                setLoadPro(false)
                setGiamGia(0)
                setThanhTien(tongTien)
                setPromoAdded(false)
            })

        }


    }
    function changeTextPromo(text) {
        var input = text.trim().toUpperCase();
        setPromoInput(input);
    }
    async function momoHandleResponse(response) {
        console.log(response);
        try {
            if (response) {
                let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                let message = response.message;
                let status = response.status
                if (status == 0) {
                    setPaymentOK(true)
                    setAfterPayment(true)
                    createOrder(1)
                    setTimeout(() => {
                        setAfterPayment(false) // Thong bao thanh toan thanh cong
                        navigation.navigate(APP_SCREEN_TYPES.ORDED)
                    }, 3000);
                } else {
                    setPaymentOK(false)
                    setAfterPayment(true)
                    setTimeout(() => {// Thong bao thanh toan that bai
                        setAfterPayment(false)
                    }, 3000);
                }
            } else {
                //let message = response.message;
                //Has Error: show message here
            }
        } catch (ex) { }
    }
    async function order() {
        if (diaChi.trim().length <= 15) {
            Alert.alert('Vui lòng nhập địa chỉ nhận hàng chính xác !')
        } else if(nameShip.trim().length <= 1){
            Alert.alert('Vui lòng nhập tên người nhận hàng chính xác !')
        }else if (checkItemOK == false) {
            Alert.alert(' Vui lòng kiểm tra lại !', 'Có sản phẩm trong giỏ hàng của bạn đã hết hàng hoặc không đủ số lượng đặt.')
        } else if (paymentAfter == true) {
            createOrder(0)
        } else if (paymentAfter == false) {
            setIdPayment(new Date().getTime() + Math.random() * 1000)
            let jsonData = {};
            jsonData.enviroment = "0";
            jsonData.action = "gettoken";
            jsonData.merchantname = "FastFoods";
            jsonData.merchantcode = "MOMOFQN520220404";
            jsonData.merchantnamelabel = "FastFoods";
            jsonData.description = "Thanh toán mua đồ ăn tại FastFood";
            jsonData.amount = thanhTien;
            jsonData.orderId = idPayment.toString();
            jsonData.orderLabel = "Mã đơn hàng";
            jsonData.appScheme = "momofqn520220404";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
            if (Platform.OS === 'android') {
                let dataPayment = await RNMomosdk.requestPayment(jsonData);
                momoHandleResponse(dataPayment);
            } else {
                RNMomosdk.requestPayment(jsonData);

            }
        }
    }
    function checkNumItem() {
        item.forEach(x => {
            if (x.quantity > x.quantityInStock) {
                setCheckItemOK(false)
            }
        });
        return true
    }

    async function createOrder(status) {
        // var ngay = new Date().getDate()
        // var thang = new Date().getMonth()
        // var nam = new Date().getFullYear()
        // var gio = new Date().getHours()
        // var phut = new Date().getMinutes()
        // var giay = new Date().getSeconds()
        // var timeCreate = nam + '-' + thang + '-' + ngay + ' ' + gio + ':' + phut + ':' + giay;
        console.log("ppppp", status);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
        }
        const url = `https://fast-food-dev.herokuapp.com/api/order`;
        const body = { //thanh toan MoMo
            "sum": thanhTien,
            "address": diaChi,
            "status": status,
            "idPayment": idPayment.toString(),
            "note": "",
            "statusShip": "0",
            "name": nameShip
        };
        const body2 = { // thanh toán khi nhan hang
            "sum": thanhTien,
            "address": diaChi,
            "status": status,
            "note": "",
            "statusShip": "0",
            "name": nameShip
        };
        if (status == 0) {
            console.log("55555");
            axios.post(url, body2, {
                headers: headers
            }).then((response) => {
                console.log("12345", response.data);
                // onRefresh()
                setModalChangeAvatar(true)
                setTimeout(() => { // Thong bao dat hang thanh cong
                    setModalChangeAvatar(false);
                    sendNoti()
                    navigation.navigate(APP_SCREEN_TYPES.ORDED)
                }, 3000);
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
                console.log("00000", error);
            })

        } else {
            console.log("666666");
            axios.post(url, body, {
                headers: headers
            }).then((response) => {
                console.log("12345", response.data);
                // onRefresh()
                setTimeout(() => {
                    sendNoti()
                }, 3000);
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
                console.log("00000", error);
            })

        }




    }

    const renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, borderColor: colors.Green, borderBottomWidth: 1, padding: _mpw(10), justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                <Image source={{ uri: item.img1 }} resizeMode='stretch' style={{ height: size.ScreenHeight / 10, width: size.ScreenWidth / 3 * 0.6, margin: _mph(5) }} />
                <View style={{ width: "40%" }}>
                    <Text style={{ fontSize: _mpw(15), color: "black" }}>{item.name}</Text>
                    <Text style={{ fontSize: _mpw(15), color: "black" }}>{item.price} đ</Text>
                    <Text style={{ fontSize: _mpw(20), color: colors.Green }}>x {item.quantity}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: colors.Green, textAlign: 'right', padding: _mpw(10), fontSize: _mpw(18) }}>{item.quantity * item.price} đ</Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
            >
                <Text style={{ textAlign: 'center', fontSize: _mpw(18), fontWeight: '700', color: colors.Green }}>Chi tiết đơn hàng</Text>
                <FlatList
                    data={dataCart}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={1}
                    style={{}}
                />
            </ScrollView>
            <View style={{ flexDirection: 'column', marginHorizontal: _mpw(5) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="ok"
                        status={paymentAfter == true ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentAfter(true)}
                    />
                    <Text style={{color:'black'}}>Thanh toán khi nhận hàng</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value="second"
                        status={!paymentAfter == true ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentAfter(false)}
                    />
                    <Text style={{color:'black'}}>Thanh toán qua ví MoMo</Text>
                </View>

            </View>
            <View style={{ alignItems: 'center', borderColor: colors.Green, borderWidth: 1, borderRadius: _mpw(15), height: _mph(35), marginVertical: _mpw(2), marginHorizontal: _mpw(10), flexDirection: 'row' }}>
                <TextInput value={nameShip} onChangeText={(text) => setNameShip(text)} style={{ width: '70%', marginHorizontal: _mpw(10) , height:'100%', color: 'black' }} placeholder={'Tên người nhận'} placeholderTextColor='gray' />
            </View>
            <View style={{ alignItems: 'center', borderColor: colors.Green, borderWidth: 1, borderRadius: _mpw(15), height: _mph(35), marginVertical: _mpw(2), marginHorizontal: _mpw(10), flexDirection: 'row' }}>
                <TextInput value={diaChi} onChangeText={(text) => setDiaChi(text)} style={{ width: '70%', marginHorizontal: _mpw(10), height:'100%', color: 'black' }} placeholder={'Địa chỉ giao đồ ăn'} placeholderTextColor='gray' />
            </View>
            <View style={{ alignItems: 'center', borderColor: colors.Green, borderWidth: 1, borderRadius: _mpw(15), height: _mph(35), marginVertical: _mpw(2), marginHorizontal: _mpw(10), flexDirection: 'row' }}>
                {promoAdded ? (
                    <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: 'black', width: '80%', marginHorizontal: _mpw(10), height:'100%' }}>{moTa}</Text>
                        <Image source={ckecked} resizeMode='stretch' style={{ height: _mpw(20), width: _mpw(20), alignSelf: 'center' }} />
                    </View>
                ) : (
                    <View style={{ width: '70%', flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput value={promoInput} style={{ marginLeft: _mpw(15), width: '100%', height:'100%', color: 'black' }} placeholder={'Nhập mã giảm giá'} autoCapitalize={'characters'} placeholderTextColor='gray' maxLength={15} clearButtonMode={'always'} onChangeText={(text) => { changeTextPromo(text) }} />
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    <SpinnerButton
                        size={2}
                        buttonStyle={{ backgroundColor: colors.Green, borderRadius: _mpw(15), height: _mph(35), width: _mph(100), justifyContent:'center' }}
                        isLoading={loadPro}
                        onPress={() => {
                            addPromo()
                        }}
                        spinnerType={'BarIndicator'}
                    >
                        <Text style={{ textAlign: 'center', lineHeight: _mph(35), color: colors.WHITE, height:'100%' }}>{promoAdded ? 'Xóa' : 'Áp dụng'}</Text>
                    </SpinnerButton>
                </View>
            </View>
            {promoAdded && (
                <View style={{ marginHorizontal: _mph(10), alignSelf: 'flex-start' }}>
                    <Text style={{color:'black'}}>Tổng tiền: {tongTien} đ</Text>
                    <Text style={{color:'black'}}>Giảm giá: -{giamGia} đ</Text>
                </View>
            )}
            <View style={{ marginHorizontal: _mph(10), alignSelf: 'flex-start' }}>
                <Text style={{color:'black'}}>Thành tiền: {thanhTien} đ</Text>
            </View>

            <TouchableOpacity
                style={{ width: _mpw(180), height: _mph(50), alignSelf: 'center', justifyContent: 'center', borderColor: colors.Green, borderWidth: 1, borderRadius: _mpw(25), backgroundColor: colors.Green, marginHorizontal: _mpw(5) }}
                onPress={() => {
                    order()
                }}
            >
                <Text style={{ color: colors.Black, textAlign: 'center', fontSize: _mpw(22), color: colors.WHITE }}>Đặt món</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', color: 'black' }}>* Phí giao hàng sẽ được thông báo khi chúng tôi gọi xác nhận đơn hàng với quý khách qua SDT đã đăng ký</Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalChangeAvatar}
                onRequestClose={() => {
                    setModalChangeAvatar(!modalChangeAvatar);
                }}>
                <View style={styles.viewModal}>
                    <View style={styles.modalView2}>
                        <View>
                            {paymentAfter ? (
                                <View>
                                    <Text style={{ textAlign: "center", color: colors.Black, fontSize: _mpw(14) }}>Vui lòng thanh toán tiền món ăn {thanhTien}đ và phí giao hàng khi nhận hàng.</Text>
                                    <Text style={{ textAlign: "center", marginTop: _mph(10), color: colors.Black, fontSize: _mpw(14) }}>Hãy chú ý điện thoại nhé !</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ textAlign: "center", color: colors.Black, fontSize: _mpw(14) }}>Vui lòng thanh toán phí giao hàng khi nhận hàng</Text>
                                    <Text style={{ textAlign: "center", marginTop: _mph(10), color: colors.Black, fontSize: _mpw(14) }}>Hãy chú ý điện thoại nhé !</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.viewBtnSelect}>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={afterPayment}
                onRequestClose={() => {
                    setModalChangeAvatar(!afterPayment);
                }}>
                <View style={styles.viewModal}>
                    <View style={styles.modalView2}>
                        <View>
                            {paymentOK ? (
                                <View>
                                    <Text style={{ textAlign: "center", color: colors.Black, fontSize: _mpw(16) }}>Thanh toán thành công !</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ textAlign: "center", color: colors.Black, fontSize: _mpw(16) }}>Thanh toán thất bại.</Text>
                                    <Text style={{ textAlign: "center", color: colors.Black, fontSize: _mpw(16) }}>Vui lòng thanh toán lại !</Text>
                                </View>
                            )}
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

export default preOrder

const styles = StyleSheet.create({
    container: {
        margin: _mpw(10)
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
    button: {
        borderRadius: 15,
        padding: 10,
        // elevation: 2,
        // margin: 5,
        // flex: 0.5
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
})