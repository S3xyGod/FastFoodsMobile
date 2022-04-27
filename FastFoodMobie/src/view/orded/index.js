import {
  StyleSheet, Text, View, ScrollView, Modal, Pressable, Image,
  RefreshControl, FlatList, Alert
} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import size, { _mph, _mpw } from '../../untils/size'
import colors from '../../untils/colors'
import config from '../../core/database/configDB'
import MSSQL from 'react-native-mssql';
import Footer from '../../common/Footer';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import CollapsibleView from "react-native-collapsible-edit";
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios';

const Orded = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [modalCancel, setModalCancel] = useState(false)
  const [idHuy, setIdHuy] = useState();


  useEffect(() => {
    syncData()
    getCart()
  }, [])
  useFocusEffect(
    useCallback(() => {
      syncData()
      getCart()
    }, []),
  );
  const onRefresh = useCallback(() => {
    syncData()
    getCart()
  }, []);

  async function syncData() {
    setRefreshing(true)
    const fetchOrder = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${global.token}`
      }
      const url = `https://fast-food-dev.herokuapp.com/api/order`;
      axios.get(url, {
        headers: headers
      }).then((response) => {
        console.log("12345", response.data);
        setDataDetail(response.data.data);
        setRefreshing(false)
      }).catch((error) => {
        Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
        console.log("00000", error);

      })

    };
    fetchOrder()
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
  async function cancelorder(id) {
    const url = `https://fast-food-dev.herokuapp.com/api/order/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${global.token}`
    }
    const body = {
      "statusShip": "4"
    };
    axios.put(url, body, {
      headers: headers
    }).then((response) => {
      console.log("12345", response.data);
        onRefresh()
        setModalCancel(false)
    }).catch((error) => {
      setModalCancel(false)
      Alert.alert("Có lỗi xảy ra !", "Vui lòng kiểm tra lại kết nối mạng.")
      console.log("00000", error);
    })
  }


  const renderItem = ({ item }) => {
    var date = item.createdAt.toString().replace('T', '  ')
    date = date.slice(0, date.lastIndexOf('.'))

    const renderItemDetail = ({ item }) => {
      return (
        <View //chi tiet mon an
          style={{ flex: 1, marginHorizontal: _mpw(10), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: item.img1 }} resizeMode='stretch' style={{ width: _mpw(40), height: _mpw(40) }}></Image>
          <View style={{ width: '55%', marginLeft: _mpw(5) }}>
            <Text style={{ textAlign: 'left', color: colors.Black, fontSize: _mpw(16) }}>{item.name}</Text>
          </View>

          <View style={{ width: '20%' }}>
            <Text style={{ color: colors.Black }}>   {item.price}</Text>
          </View>
          <Text style={{ marginLeft: _mpw(10), color: colors.Black }}>X {item.quantity}</Text>
        </View>

      )
    }
    return (
      <View
        style={{ flex: 1, paddingHorizontal: _mpw(10), justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
        <CollapsibleView title={<Text style={item.statusShip == 0 ? { color: colors.Black } : item.statusShip == 1 || item.statusShip == 2 || item.statusShip == 3 ? { color: colors.Green } : { color: colors.Red }}>Ngày đặt:  {date}</Text>}
          style={{ flex: 1, alignItems: 'flex-start', colors: 'black' }}

        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <FlatList //ds mon an
                data={item.orderDetail}
                renderItem={renderItemDetail}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={1}
                style={{ marginVertical: _mph(10) }}
              />
            </View>
            <Text style={{ paddingLeft: _mpw(10), fontSize: _mpw(15), color: colors.Black }}>{!item.status == 0 ? 'Thanh toán khi nhận hàng' : 'Đã thanh toán qua MoMo'}</Text>
            <Text style={{ paddingLeft: _mpw(10), fontSize: _mpw(15), color: colors.Black }}>Trạng thái: {item.statusShip == 0 ? 'Đang xác nhận' : item.statusShip == 1 ? 'Đang chuẩn bị' : item.statusShip == 2 ? 'Đang giao hàng' : item.statusShip == 3 ? "Đã giao hàng" : 'Đã hủy'}</Text>
            <Text style={{ color: colors.Green, textAlign: 'center', padding: _mpw(10), fontSize: _mpw(18) }}>Số tiền thanh toán: {item.sum} đ</Text>
            {item.statusShip == 0 && (
              <TouchableOpacity
                onPress={() => {
                  setIdHuy(item._id)
                  setModalCancel(true)
                }}
                style={{ alignItems: 'center', marginBottom: _mph(5), }}>
                <View style={{ width: '20%', backgroundColor: colors.Red, borderRadius: _mpw(8) }}>
                  <Text style={{ textAlign: 'center', color: colors.White, fontSize: _mpw(14) }}>Hủy</Text>
                </View>
              </TouchableOpacity>
            )}

          </View>

        </CollapsibleView>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }
      >
        <Text style={{ textAlign: 'center', marginTop: _mph(5), color: colors.Black, fontSize: _mpw(18) }}>Đơn hàng của bạn</Text>
        <FlatList //ds order
          data={dataDetail}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={1}
          style={{ marginVertical: _mph(10) }}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCancel}
      >
        <View style={styles.viewModal}>
          <View style={styles.modalView2}>
            <View style={styles.viewBtnSelect}>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  cancelorder(idHuy)
                }}>
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => {
                  setModalCancel(false)
                }}>
                <Text style={styles.textStyle}>Quay lại</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  )
}

export default Orded

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginHorizontal: 10
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
    fontSize: _mpw(14),
    lineHeight: _mpw(18)
  },
})