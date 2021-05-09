import { StyleSheet } from 'react-native'
import get from 'lodash/get'

import { COLORS, FONT_SIZES } from 'services/style'

export const BUTTON_SCHEMES = {
  PRIMARY: 'primary',
  INACTIVE: 'inactive',
  SECONDARY: 'secondary',
  PRIMARY_OUTLINE: 'primaryOutline',
  PRIMARY_LINK: 'primaryLink',
  SECONDARY_LINK: 'secondaryLink',
  DANGER: 'danger',
}

export const STYLE_SCHEMES = {
  danger: {
    backgroundColor: COLORS.DANGER,
    color: COLORS.WHITE,
    borderColor: COLORS.DANGER,
  },
  primary: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE,
    borderColor: COLORS.PRIMARY,
  },
  inactive: {
    backgroundColor: COLORS.LIGHT_GRAY,
    color: COLORS.DARK_GRAY,
    borderColor: COLORS.LIGHT_GRAY,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: COLORS.DARK_GRAY,
    borderColor: COLORS.LIGHT_GRAY,
  },
  primaryOutline: {
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  primaryLink: {
    backgroundColor: 'transparent',
    color: COLORS.PRIMARY,
    borderColor: 'transparent',
    borderWidth: 0,
    textTransform: 'none',
  },
  secondaryLink: {
    backgroundColor: 'transparent',
    color: COLORS.DARK_GRAY,
    borderColor: 'transparent',
    borderWidth: 0,
    textTransform: 'none',
  },
}

export const getStyles = ({ scheme }) => {
  const styleScheme = get(STYLE_SCHEMES, scheme, STYLE_SCHEMES.primary)

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: styleScheme.color,
      textTransform: styleScheme.textTransform ? styleScheme.textTransform : 'uppercase',
      fontSize: FONT_SIZES.small,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      height: 48,
      borderRadius: 32,
      borderWidth: 1,
    },
  })
}
