import {Dimensions} from 'react-native';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
const SIZE_TXT_HEADER = 20;
export const Screen = Dimensions.get('window');
const width = WIDTH < HEIGHT ? WIDTH : HEIGHT;
const ScreenWidth = Screen.width;
const ScreenHeight = Screen.height;
const height = WIDTH > HEIGHT ? WIDTH : HEIGHT;
const REM = WIDTH / 375;

const REAL_SIZE_2 = 2 * REM;
const REAL_SIZE_3 = 3 * REM;
const REAL_SIZE_4 = 4 * REM;
const REAL_SIZE_5 = 5 * REM;
const REAL_SIZE_6 = 6 * REM;
const REAL_SIZE_8 = 8 * REM;
const REAL_SIZE_9 = 9 * REM;
const REAL_SIZE_10 = 10 * REM;
const REAL_SIZE_12 = 12 * REM;
const REAL_SIZE_14 = 14 * REM;
const REAL_SIZE_15 = 15 * REM;
const REAL_SIZE_16 = 16 * REM;
const REAL_SIZE_18 = 18 * REM;
const REAL_SIZE_20 = 20 * REM;
const REAL_SIZE_21 = 21 * REM;
const REAL_SIZE_24 = 24 * REM;
const REAL_SIZE_26 = 26 * REM;
const REAL_SIZE_27 = 27 * REM;
const REAL_SIZE_28 = 28 * REM;
const REAL_SIZE_30 = 30 * REM;
const REAL_SIZE_32 = 32 * REM;
const REAL_SIZE_36 = 36 * REM;
const REAL_SIZE_40 = 40 * REM;
const REAL_SIZE_44 = 44 * REM;
const REAL_SIZE_48 = 48 * REM;
const REAL_SIZE_50 = 50 * REM;
const REAL_SIZE_54 = 54 * REM;
const REAL_SIZE_60 = 60 * REM;
const REAL_SIZE_72 = 72 * REM;
const REAL_SIZE_80 = 80 * REM;
const REAL_SIZE_96 = 96 * REM;
const REAL_SIZE_108 = 108 * REM;
const REAL_SIZE_150 = 150 * REM;
const REAL_SIZE_200 = 200 * REM;
const REAL_SIZE_300 = 300 * REM;
const REAL_SIZE_350 = 350 * REM;

const calculationRealSize = size => {
  return size * REM;
};

export default {
  WIDTH,
  HEIGHT,
  REM,
  REAL_SIZE_2,
  REAL_SIZE_3,
  REAL_SIZE_4,
  REAL_SIZE_5,
  REAL_SIZE_6,
  REAL_SIZE_8,
  REAL_SIZE_9,
  REAL_SIZE_10,
  REAL_SIZE_12,
  REAL_SIZE_14,
  REAL_SIZE_15,
  REAL_SIZE_16,
  REAL_SIZE_18,
  REAL_SIZE_20,
  REAL_SIZE_21,
  REAL_SIZE_24,
  REAL_SIZE_26,
  REAL_SIZE_27,
  REAL_SIZE_28,
  REAL_SIZE_30,
  REAL_SIZE_32,
  REAL_SIZE_36,
  REAL_SIZE_40,
  REAL_SIZE_44,
  REAL_SIZE_48,
  REAL_SIZE_50,
  REAL_SIZE_54,
  REAL_SIZE_60,
  REAL_SIZE_72,
  REAL_SIZE_80,
  REAL_SIZE_96,
  REAL_SIZE_108,
  REAL_SIZE_150,
  REAL_SIZE_200,
  REAL_SIZE_300,
  REAL_SIZE_350,
  calculationRealSize,
  SIZE_TXT_HEADER,
  ScreenHeight,
  ScreenWidth
};

export const _mpw = value => {
  const current = width > 500 ? (value * width) / 450 : (value * width) / 375;
  return current;
};

export const _mph = value => {
  const current = (value * height) / 667;
  return current;
};

// fontSize Text
export const FontText10 = _mpw(10);
export const FontText12 = _mpw(12);
export const FontText14 = _mpw(14);
export const FontText16 = _mpw(16);
export const FontText18 = _mpw(18);
export const FontText24 = _mpw(24);
export const FontText20 = _mpw(20);
export const FontText22 = _mpw(22);
export const FontText30 = _mpw(30);
