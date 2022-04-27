/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

PushNotification.configure({});
PushNotification.createChannel(
  {
    channelId: "channel-wellcom", // (required)
    channelName: "Wellcom", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
PushNotification.localNotification({
    channelId: "channel-wellcom",
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    color: "green",
    vibrate: true,
    vibration: 300,
    title: "Xin chào",
    message: "Chào mừng bạn đến với FastFoods. Hãy đăng nhập để sử dụng ứng dụng!",
    playSound: true,
    soundName: "default",
    // actions: ["Accept", "Reject"],
  });


AppRegistry.registerComponent(appName, () => App);
