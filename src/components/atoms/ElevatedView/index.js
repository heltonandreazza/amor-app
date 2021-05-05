import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, ViewPropTypes } from 'react-native'
import { COLORS } from 'services/style'

const ElevatedView = ({ elevation, style, children, ...otherProps }) => {
  if (Platform.OS === 'android') {
    return (
      <View elevation={elevation} style={[{ elevation, backgroundColor: COLORS.WHITE }, style]} {...otherProps}>
        {children}
      </View>
    )
  }

  if (elevation === 0) {
    return (
      <View style={style} {...otherProps}>
        {children}
      </View>
    )
  }

  const iosShadowElevation = {
    backgroundColor: COLORS.WHITE,
    shadowOpacity: 0.0015 * elevation + 0.18,
    shadowRadius: 0.54 * elevation,
    shadowOffset: {
      height: 0.6 * elevation,
    },
  }

  return (
    <View style={[iosShadowElevation, style]} {...otherProps}>
      {children}
    </View>
  )
}

ElevatedView.propTypes = {
  elevation: PropTypes.number,
  style: ViewPropTypes.style,
  children: PropTypes.node,
}

ElevatedView.defaultProps = {
  elevation: 0,
  style: {},
  children: null,
}

export default ElevatedView
