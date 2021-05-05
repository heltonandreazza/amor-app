import React from 'react'
import PropTypes from 'prop-types'
import { Text as NativeText } from 'react-native'
import { FONT_WEIGHT } from 'services/style'

import styles from './styles'

const Text = props => {
  const { children, medium, bold, style, shadow } = props

  const mediumFont = medium ? { fontWeight: FONT_WEIGHT.medium } : {}
  const boldFont = bold ? { fontWeight: FONT_WEIGHT.bold } : {}
  const shadowFont = shadow
    ? {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
      }
    : {}

  return (
    <NativeText {...props} style={[styles.text, style, mediumFont, boldFont, shadowFont]}>
      {children}
    </NativeText>
  )
}

Text.propTypes = {
  children: PropTypes.node,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  style: NativeText.propTypes.style,
  shadow: PropTypes.bool,
}

Text.defaultProps = {
  children: '',
  medium: false,
  bold: false,
  style: {},
  shadow: false,
}

export default Text
