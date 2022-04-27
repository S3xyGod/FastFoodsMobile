import 'react-native-gesture-handler'; // phải ở trên đầu, init react-native-gesture-handler
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/core/redux/store';
import i18next from './src/i18n'; // init i18n
import AppRouter from './src/router';
import { LogBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import MSSQL from 'react-native-mssql';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);




const App = () => {
  useEffect(() => {

    setTimeout(() => {
      SplashScreen.hide()
    }, 300);
  }, [])

return (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
};
export default App;
