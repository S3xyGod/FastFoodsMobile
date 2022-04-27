import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_SCREEN_TYPES} from './screenTypes';
import Login from '../view/login';
import Home from '../view/Home';
import Header from '../common/Header';
import Menu from '../view/Menu';
import topSell from '../view/TopSeller';
import editInfor from '../view/editInfor'
import Cart from '../view/Cart'
import PreOder from '../view/preOrder';
import Orded from '../view/orded';
import Payment from '../view/payment';
import Promo from '../view/Promo';
import changePass from '../view/changePass';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const options = {
  headerShown: false,
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
};

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  );
};

const MenuDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
        drawerStyle: {
          width: '90%',
          marginLeft: '30%',
        },
        header: props => <Header {...props}
        initialRouteName={APP_SCREEN_TYPES.HOME}/>,
      }}>
      <Drawer.Screen name={APP_SCREEN_TYPES.HOME} component={Home} />
      <Drawer.Screen name={APP_SCREEN_TYPES.EDIT_INFOR} component={editInfor} />
      <Drawer.Screen name={APP_SCREEN_TYPES.CART} component={Cart} />
      <Drawer.Screen name={APP_SCREEN_TYPES.PRE_ORDER} component={PreOder} />
      <Drawer.Screen name={APP_SCREEN_TYPES.ORDED} component={Orded} />
      <Drawer.Screen name={APP_SCREEN_TYPES.PAYMENT} component={Payment} />
      <Drawer.Screen name={APP_SCREEN_TYPES.TOP_SELL} component={topSell} />
      <Drawer.Screen name={APP_SCREEN_TYPES.PROMO} component={Promo} />
      <Drawer.Screen name={APP_SCREEN_TYPES.CHANGE_PASS} component={changePass} />
    </Drawer.Navigator>
  );
};

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}
      initialRouteName={APP_SCREEN_TYPES.LOGIN}>
        <Stack.Screen
          name={APP_SCREEN_TYPES.LOGIN}
          component={Login}
          options={options}
        />
        <Stack.Screen
          name={APP_SCREEN_TYPES.MENU_DRAWER}
          component={MenuDrawer}
          options={options}
        /> 
              
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
