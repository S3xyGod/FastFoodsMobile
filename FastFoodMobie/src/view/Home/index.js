import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View, Image, RefreshControl, FlatList, Alert } from 'react-native';
import Footer from '../../common/Footer';
import { APP_SCREEN_TYPES } from '../../router/screenTypes';
import size, { _mph, _mpw } from '../../untils/size';
import HomeOption from './homeOption';
import menuImg from '../../assets/images/menu.png';
import bestSeller from '../../assets/images/best-seller.png';
import promotion from '../../assets/images/promotion.png';
import yourorder from '../../assets/images/your-order.png';
import { ImageSlider } from "react-native-slide-images-base64";
import imageDemo from './imageDemo';
import MSSQL from 'react-native-mssql';
import config from '../../core/database/configDB';
import styles from './styles';
import ScrollingButtonMenu from 'react-native-scroll-menu-custom';
import colors from '../../untils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import addIcon from '../../assets/images/add.png'
import {
  useFocusEffect,
} from '@react-navigation/native';
import { onChange, set } from 'react-native-reanimated';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const Home = ({ navigation, route }) => {
  const { t } = useTranslation();
  let menus = [
    {
      name: 'Pizza bò',
      _id: 1,
      img: imageDemo,
      img1: imageDemo,
      gia: '50000đ',
      idTheLoai: 1,
      image: imageDemo
    },
    {
      name: 'Hamburger chay',
      _id: 2,
      img: imageDemo,
      img1: imageDemo,
      gia: '40000đ',
      idTheLoai: 2,
      image: imageDemo
    },
    {
      name: 'Coca lon lớn',
      _id: 3,
      img: imageDemo,
      img1: imageDemo,
      gia: '10000đ',
      idTheLoai: 3,
      image: imageDemo
    },
    {
      name: 'Gà rán cay',
      _id: 4,
      img: imageDemo,
      img1: imageDemo,
      gia: '25000đ',
      idTheLoai: 4,
      image: imageDemo
    },
  ];
  const [dataBanner, setDataBanner] = useState(menus);
  const [dataMenuDemo, setDataMenuDemo] = useState(menus);
  const [dataMonAn, setDataMonAn] = useState(menus);
  const [refreshing, setRefreshing] = useState(false)
  const [clickLoc, setClickLoc] = useState(false)
  const [dataLoc, setDataLoc] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nameLoaiLoc, setNameLoaiLoc] = useState('')

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, []),
  );
  useEffect(() => {
    onRefresh()
  }, [])
  

  function sortRandom(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setClickLoc(false)
    console.log("getData");
    getCart()
    fetchBanner()
    fetchDish()
    fetchType()
  }, []);

  const fetchType = async () => {
    const res = {
      method: 'get',
      url: `https://fast-food-dev.herokuapp.com/api/foodType`,
    };
    const response = await axios(res);

    if (response.data.data.length > 0) {
      var temp2 = sortRandom(response.data.data)
      setDataMenuDemo(temp2);
    }
  };
  const fetchBanner = async () => {
    const res = {
      method: 'get',
      url: `https://fast-food-dev.herokuapp.com/api/banner`,
    };
    const response = await axios(res);
    if (response.data.data.length > 0) {
      var temp = sortRandom(response.data.data)
      setDataBanner(temp);

    }
  };
  const fetchDish = async () => {
    const res = {
      method: 'get',
      url: `https://fast-food-dev.herokuapp.com/api/food`,
    };
    const response = await axios(res);

    if (response.data.data.length > 0) {
      var temp3 = sortRandom(response.data.data)
      setDataMonAn(temp3);
      setTimeout(() => {
        setRefreshing(false)
      }, 2000);
    }
  };

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
  function locData(id) {
    setDataLoc([])
    console.log(id);
    if (id == currentIndex) {
      setClickLoc(false)
      // setCurrentIndex(0)
    } else {
      // setCurrentIndex(id)
      var temp = []
      dataMonAn.forEach(x => {
        if (x.idFoodType == id) {
          temp.push(x)
        }
      });
      setDataLoc(temp)
      setClickLoc(true)
    }


  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{ flex: 0.5, borderColor: colors.Green, borderWidth: 1, marginVertical: _mpw(10), marginLeft: _mph(10), borderRadius: _mpw(20), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: _mpw(15), color: "black", textAlign: 'center', marginTop: _mph(5) }}>{item.name}</Text>
        <Image source={{ uri: item.img1 }} resizeMode='stretch' style={{ height: size.ScreenHeight / 5, width: size.ScreenWidth / 3 * 1.2, margin: _mph(5) }} />
        <Text style={{ textAlign: 'right', width: "100%", marginRight: _mpw(20), color: colors.Black }}>SL: {item.quantity}</Text>
        <View style={{ width: '100%', flexDirection: 'row', height: _mpw(40) }}>
          <Text style={{ width: '75%', fontSize: _mpw(25), color: "black", textAlign: 'center' }}>{item.price + 'đ'}</Text>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}
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
    <View nestedScrollEnabled={true} style={styles.container}>
      <ScrollView style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }>
        <View style={{ height: _mph(150), width: size.ScreenWidth }}>
          <ImageSlider
            data={dataBanner}
            autoPlay={true}
            closeIconColor="#fff"
            timer={3500}
            caroselImageStyle={styles.slide}
          />
        </View>
        <View style={styles.scrollView}>
          <View style={{ flexDirection: 'row' }}>
            <HomeOption
              title={t('home:Cart')}
              icon={menuImg}
              destination={APP_SCREEN_TYPES.CART}
            />
            <HomeOption
              title={t('home:ProMo')}
              icon={promotion}
              destination={APP_SCREEN_TYPES.PROMO}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: _mpw(5) }}>
            <HomeOption
              title={t('home:Hot')}
              icon={bestSeller}
              destination={APP_SCREEN_TYPES.TOP_SELL}
            />
            <HomeOption
              title={t('home:MyOrder')}
              icon={yourorder}
              destination={APP_SCREEN_TYPES.ORDED}
            />
          </View>
        </View>
        <ScrollingButtonMenu
          items={dataMenuDemo}
          activeBackgroundColor={colors.Green}
          onPress={(e) => {
            locData(e._id);
            setCurrentIndex(e._id)
            setNameLoaiLoc(e.name)
          }}
          buttonStyle={{
            width: size.ScreenWidth / 2.4,
            height: _mph(50),
            activeBackgroundColor: '#000000',
            activeColor: '#000000'
          }}

        />
        <Text style={{ marginTop: _mph(10), marginLeft: _mph(10), fontSize: _mpw(15) }}>{clickLoc ? nameLoaiLoc : "Tất cả món ăn"}</Text>
        <FlatList
          data={!clickLoc ? dataMonAn : dataLoc}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          horizontal={false}
          numColumns={2}
          style={{ marginBottom: _mph(10), marginRight: _mph(10) }}
        />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Home;

