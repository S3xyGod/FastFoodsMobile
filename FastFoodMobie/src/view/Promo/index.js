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

const Promo = () => {
    const [dataKM, setDataKM] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        onRefresh()
    }, [])

    async function getKhuyenMai() {
        setDataKM([])
        setRefreshing(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${global.token}`
          }
          console.log("ppppp", global.token);
          axios.get(`https://fast-food-dev.herokuapp.com/api/sales`, {
            headers: headers
          }).then((response) => {
              if (response.data) {
                setDataKM(response.data.data)
                setRefreshing(false);
              }
            }).catch((error) => {
              console.log("69999", error);
              setRefreshing(false);
            })
    }

    const onRefresh = useCallback(() => {
        getKhuyenMai()
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, borderColor: colors.Green, borderWidth: 1, marginBottom: _mpw(10), marginHorizontal: _mpw(15), borderRadius: _mpw(20), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.Black, fontSize: _mpw(20) }}>Mã: {item.code}</Text>
                {item.img ? (
                    <Image source={{ uri: item.img }} resizeMode='stretch' style={{ width: '85%', height: _mph(200) }} />

                ) : (
                    <Text style={{ textAlign: 'center', marginHorizontal: _mpw(15) }}>{item.name}</Text>
                )}
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
                {dataKM.length <= 0 ? (
                    <Text style={{ textAlign: 'center', fontSize: _mpw(20), color: colors.Black, marginTop: _mph(50) }}>Hiện bạn chưa có khuyến mãi nào !</Text>
                ) : (
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: _mpw(18), color: colors.Black }}>Khuyến mãi hiện có</Text>
                        <FlatList
                            data={dataKM}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal={false}
                            numColumns={1}
                            style={{ marginVertical: _mph(10) }}
                        />
                    </View>
                )}

            </ScrollView>
            <Footer />
        </View>
    )
}

export default Promo

const styles = StyleSheet.create({})