import { Dimensions } from 'react-native'

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH
export const LATERAL_PADDING = 16

export const COLORS = Object.freeze({
  PRIMARY: '#007bff',
  ORANGE: '#F39000',
  SUCCESS: '#2FD07B',
  DANGER: '#F54337',
  WARNING: '#FA6400',
  LIGHT_BLUE: '#007bff',
  NIGHT_RIDER: '#333333',
  DARK_GRAY: '#999999',
  GRAY: '#CCCCCC',
  WHITE: '#FFFFFF',
  BLACK: '#1A1A1A',
  OFF_WHITE: '#FAFAFA',
  WHITESMOKE: '#F5F5F5',
  TRANSPARENT: 'transparent',
  SUCCESS_BACKGROUND: '#E1F8EC',
  DANGER_BACKGROUND: '#FEE4E1',
  WARNING_BACKGROUND: '#FEE9DB',
  LIGHT_GRAY: '#D8D8D8',
})

export const borders = Object.freeze({
  borderWidth: 1,
  borderColor: COLORS.GRAY,
  borderRadius: 32,
})

export const defaultLateralPadding = Object.freeze({
  paddingLeft: LATERAL_PADDING,
  paddingRight: LATERAL_PADDING,
})

export const ICON_SIZE = 24

export const FONT_SIZES = Object.freeze({
  default: 14,
  small: 12,
  large: 16,
  xlarge: 24,
})

export const FONT_WEIGHT = Object.freeze({
  normal: "normal",
  medium: "600",
  bold: "bold",
})

export const FONT_FAMILY = Object.freeze({
  regular: 'space-mono',
})

export const HIT_SLOP = Object.freeze({ top: 8, left: 8, right: 8, bottom: 8 })
