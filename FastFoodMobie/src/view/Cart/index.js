import { StyleSheet, Alert, Text, View, ScrollView, RefreshControl, FlatList, Pressable, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback, useReducer } from 'react'
import config from '../../core/database/configDB'
import MSSQL from 'react-native-mssql';
import Footer from '../../common/Footer';
import size, { _mpw, _mph } from '../../untils/size';
import colors from '../../untils/colors';
import Counter from "react-native-counters-edit";
import closeBtn from '../../assets/images/close.png'
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import SpinnerButton from 'react-native-spinner-button';
import { TextInput } from 'react-native-gesture-handler';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import axios from 'axios';

const Cart = ({ navigation }) => {
    var [dataCart, setDatacart] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [modalDelItem, setModalDelItem] = useState(false);
    var [tongTien, setTongTien] = useState(0);
    const [idDel, setIdDel] = useState()

    useFocusEffect(
        useCallback(() => {
            onRefresh()
        }, []),
    );

    const onRefresh = useCallback(() => {
        setDatacart([])
        setRefreshing(true);
        setModalDelItem(false)
        fetchData()
        getCart()
    }, []);
    async function fetchData() {
        const AuthStr = 'Bearer '.concat(global.token);
        axios.get("https://fast-food-dev.herokuapp.com/api/cart", { headers: { Authorization: AuthStr } })
            .then((response) => {
                getCart()
                if (response.data) {
                    //convertData(response.data.data);
                    var aaa = response.data.data.filter(e => isNaN(e.price) == false)
                    setDatacart(aaa)
                    
                    getTongTien(response.data.data)
                    setRefreshing(false);
                }
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại thông tin đăng nhập hoặc kết nối mạng.")
                console.log('err', error);
                setRefreshing(false);
            })
    }
    async function getCart() {
        const AuthStr = 'Bearer '.concat(global.token);
        axios.get("https://fast-food-dev.herokuapp.com/api/cart", { headers: { Authorization: AuthStr } })
            .then((response) => {
                if (response.data.data) {
                    // global.numCart = response.data.data.length;
                    var temp = 0;
                    response.data.data.forEach(x => {
                        if(isNaN(x.price) == false){
                             temp += x.quantity
                        }
                       
                    });
                }
                global.numCart = temp
            }).catch((error) => {
                console.log("error", error)
            })
    }

    function getTongTien(arr) {
        var tien = 0;
        if (arr.length > 0) {
            arr.forEach(e => {
                if (isNaN(e.price) == false) {
                    tien += new Number(e.price) * new Number(e.quantity);
                }
            });
            setTongTien(tien);
        } else {
            setTongTien(0);
        }

    }

    async function updateCart(idOrder, soLuong) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
        }
        const url = `https://fast-food-dev.herokuapp.com/api/cart/${idOrder}`;
        const body = { "quantity": `${soLuong}` };
        axios.put(url, body, {
            headers: headers
        })
            .then((response) => {
                console.log("12345", response.data);
                onRefresh()
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
                console.log("00000", error);
            })
    }
    async function delItemInCart(id) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
        }
        const url = `https://fast-food-dev.herokuapp.com/api/cart/${id}`;
        axios.delete(url, {
            headers: headers
        })
            .then((response) => {
                console.log("979797", response.data.data);
                onRefresh()
            }).catch((error) => {
                Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
                console.log("00000", error);
            })
    }

    async function checkToPreOrder() {
        navigation.navigate(APP_SCREEN_TYPES.PRE_ORDER);
    }


    const renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, borderColor: colors.Green, borderBottomWidth: 1, padding: _mpw(10), justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                <Image source={{ uri: item.img1 }} resizeMode='stretch' style={{ height: size.ScreenHeight / 10, width: size.ScreenWidth / 3 * 0.6, margin: _mph(5) }} />
                <View style={{ width: "40%" }}>
                    <Text style={{ fontSize: _mpw(15), color: "black" }}>{item.name}</Text>
                    <Text style={{ fontSize: _mpw(15), color: "black" }}>{item.price} đ</Text>
                    <Counter min={1} max={item.quantityInStock} start={item.quantity} onChange={(value) => {
                        updateCart(item._id, value)
                    }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ color: colors.Green, textAlign: 'right', padding: _mpw(10), fontSize: _mpw(18) }}>{item.quantity * item.price} đ</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setIdDel(item.idFood)
                            setModalDelItem(true)
                        }}
                        style={{
                            marginRight: _mpw(5),
                            alignSelf: 'center'
                        }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={closeBtn}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        )
    }


    return (
        <View nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                style={{ marginBottom: _mph(35) }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                } >
                {dataCart.length <= 0 ? (
                    <Text style={{ textAlign: 'center', fontSize: _mpw(20), color: colors.Black, marginTop: _mph(50) }}>Giỏ hàng trống !</Text>
                ) : (
                    <FlatList
                        data={dataCart}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal={false}
                        numColumns={1}
                        style={{ marginVertical: _mph(10) }}
                    />
                )}
            </ScrollView>
            <View style={{ marginBottom: _mph(30) }}>
                <SpinnerButton
                    buttonStyle={{ width: _mpw(180), height: _mph(50), justifyContent: 'center', borderColor: colors.Green, borderWidth: 1, borderRadius: _mpw(25), backgroundColor: colors.Green }}
                    isLoading={refreshing}
                    onPress={() => {
                        console.log("order");
                        checkToPreOrder()
                    }}
                    spinnerType={'BarIndicator'}
                    disabled={refreshing || dataCart.length == 0}
                >
                    <Text style={{ color: colors.Black, textAlign: 'center', fontSize: _mpw(22), color: colors.WHITE }}>Tiếp theo</Text>
                    {dataCart.length > 0 && (
                        <Text style={{ color: colors.Black, textAlign: 'center', fontSize: _mpw(14) }}>Tổng tiền: {tongTien} đ</Text>

                    )}
                </SpinnerButton>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDelItem}
                onRequestClose={() => {
                    setModalDelItem(!modalDelItem);
                }}>
                <View style={styles.viewModal}>
                    <View style={styles.modalView2}>
                        <View style={styles.viewBtnSelect}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => {
                                    delItemInCart(idDel);
                                    setModalDelItem(false)
                                }}>
                                <Text style={styles.textStyle}>Bỏ món khỏi danh sách</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => {
                                    setModalDelItem(false)
                                }}>
                                <Text style={styles.textStyle}>Trở lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Footer />

        </View>
    )
}

export default Cart;

const styles = StyleSheet.create({
    viewModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView2: {
        width: size.WIDTH / 10 * 7,
        margin: 10,
        backgroundColor: "#999999",
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
        justifyContent: "center",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: _mpw(12),
        lineHeight: _mpw(16)
    },
})