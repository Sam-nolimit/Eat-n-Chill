import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#04100F',
  buttonDisabled: '#EFFBF9',
  primaryLight: 'rgba(42, 157, 143, 0.1)',
  primaryLightBg: '#F7FDFC',
  primaryAccent: '#E76F51', //default primary Orange used
  primaryTint: '#FDF0ED', //default primary used
  textDark: '#04100F', // default for texts
  textMid: '#525252',
  textLight: '#383838',
  divider: '#EBEBEB',
  placeholder: '#6B6B6B',
  inActiveTab: '#858585',
  black: '#000000',
  white: '#ffffff',
  success: 'rgba(28, 219, 47, 1)',
  error: '#EE404C',
  logout: '#FEF8F6',
  transparent: 'transparent',
  background: '#fa9c05',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  bodySmall: 20,
  // app dimensions
  width,
  height,
};

export const FONTS = {
  fontFamilyBlack: 'BR Firma Black',
  fontFamilyBlackItalic: 'BR Firma Black Italic',
  fontFamilyBold: 'BR Firma Bold',
  fontFamilyBoldItalic: 'BR Firma Bold Italic',
  fontFamilyExtraBold: 'BR Firma Extra Bold',
  fontFamilyLight: 'BR Firma Light',
  fontFamilyLightItalic: 'BR Firma Light Italic',
  fontFamilyThin: 'BR Firma Thin',
  fontFamilyThinItalic: 'BR Firma Thin Italic',
  fontFamilyItalic: 'BR Firma Italic',
  fontFamilyMedium: 'BR Firma Medium',
  fontFamilyMediumItalic: 'BR Firma Medium Italic',
  fontFamily: 'BR Firma Regular',
  fontFamilyRegular: 'BR Firma Regular',
  fontFamilySemiBold: 'BR Firma SemiBold',
  fontFamilySemiBoldItalic: 'BR Firma SemiBold Italic',
};

export const DARKTHEME = {
  mode: 'dark',
  primary: '#ffffff',
  primaryBackground: '#212121',
  primaryLightBg: '#F7FDFC',
  statusBar: 'light-content',
  button: '#ffffff',
};
export const LIGHTTHEME = {
  mode: 'light',
  primary: '#04100F',
  buttonDisabled: '#EFFBF9',
  primaryBackground: 'rgba(42, 157, 143, 0.1)',
  primaryLightBg: '#F7FDFC',
  statusBar: 'default',
  button: '#000',
};
