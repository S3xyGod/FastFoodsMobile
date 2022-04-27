import {
    StyleSheet, Text, View, ScrollView, Modal, Pressable, Image, TouchableOpacity,
    RefreshControl, FlatList,
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import size, { _mph, _mpw } from '../../untils/size'
import colors from '../../untils/colors'
import config from '../../core/database/configDB'
import MSSQL from 'react-native-mssql';
import Footer from '../../common/Footer';
import addIcon from '../../assets/images/add.png'
import {
    useFocusEffect,
} from '@react-navigation/native';
import axios from 'axios';

const topSell = () => {
    const [dataTop, setDataTop] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    // useEffect(() => {
    //     onRefresh()
    // }, [])
    useFocusEffect(
        useCallback(() => {
            onRefresh()
            getCart()
        }, []),
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setDataTop([])
        console.log("get Top");
        const fetchTOP = async () => {
            const res = {
                method: 'get',
                url: `https://fast-food-dev.herokuapp.com/api/food/orderRate`,
            };
            const response = await axios(res);
            if (response.data.data.length > 0) {
                setDataTop(response.data.data.slice(9))
                setRefreshing(false);
            }
        };
        fetchTOP()
    }, []);

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
                if(isNaN(x.price) == false){
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

    async function updateSoLuong(soLuong, idOrder) {
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
            global.numCart++
          }).catch((error) => {
            Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
            console.log("00000", error);
          })
      }
      async function addNewSelected(idMon) {
        console.log("22222 add new");
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${global.token}`
        }
        const url = `https://fast-food-dev.herokuapp.com/api/cart`;
        const body = {
          "idFood": `${idMon}`,
          "quantity": "1"
        };
        axios.post(url, body, {
          headers: headers
        }).then((response) => {
            if (response.data) {
              console.log("989898",response.data);
              global.numCart++
            }
          }).catch((error) => {
            Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
    
          })
      }


    async function addTocart(idMon) {
        const AuthStr = 'Bearer '.concat(global.token);
        axios.get("https://fast-food-dev.herokuapp.com/api/cart", { headers: { Authorization: AuthStr } })
          .then((response) => {
            if (response.data) {
              if (response.data.data == 0) {
                addNewSelected(idMon, "1")
              } else {
                var test = response.data.data.find(e => e.idFood == idMon);
                if (!test == false) {
                  var quan = parseInt(test.quantity)
                  console.log("66666", quan);
                  updateSoLuong(quan + 1, test._id)
                } else {
                  addNewSelected(idMon)
                  console.log("88888");
                }
    
              }
    
            }
          }).catch((error) => {
            Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
          })

    }

    const renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 0.5, borderColor: colors.Green, borderWidth: 1, margin: _mpw(10), borderRadius: _mpw(20), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: _mpw(15), color: "black" }}>{item.name}</Text>
                <Image source={{ uri: item.img1 }} resizeMode='stretch' style={{ height: size.ScreenHeight / 5, width: size.ScreenWidth / 3 * 1.2, margin: _mph(5) }} />
                <Text style={{ textAlign: 'right', width: "100%", marginRight: _mpw(20), color: colors.Black }}>SL: {item.quantity}</Text>
                <View style={{ width: '100%', flexDirection: 'row', height: _mpw(40) }}>
                    <Text style={{ width: '75%', fontSize: _mpw(25), color: "black", textAlign: 'center' }}>{item.price + 'đ'}</Text>
                    <TouchableOpacity style={{ alignSelf: 'center' }}
                        onPress={() => {
                            addTocart(item._id)
                        }}>
                        <Image source={addIcon} resizeMode='stretch' style={{ width: _mpw(30), height: _mpw(30) }} />
                    </TouchableOpacity>

                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }} nestedScrollEnabled={true} >
            <ScrollView nestedScrollEnabled={true}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }>
                <Text style={{ fontSize: _mpw(20), color: colors.Black, textAlign: 'center', marginTop: _mpw(5) }}>TOP được đặt nhiều</Text>
                <FlatList
                    data={dataTop}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    numColumns={2}
                    style={{ marginVertical: _mph(10) }}
                />
            </ScrollView>
            <Footer />
        </View>

    )
}

export default topSell

const styles = StyleSheet.create({})