import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import size from './size';
// import {useTranslation} from 'react-i18next';
const {width, height} = Dimensions.get('window');

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateString(string) {
  const patternSpecialCharacters =
    /[!@#$%^&¥€$•*~`√π÷×¶∆£¢°©®™℅()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (string && string.match(patternSpecialCharacters)) {
    return true;
  } else {
    return false;
  }
}

export {validateEmail, validateString};
