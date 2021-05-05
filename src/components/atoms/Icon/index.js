import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import { COLORS } from 'services/style'
import styles from './styles'

const Icon = ({ icon, color, ...props }) => {
  const type = `${icon}`.split(' ')[0]
  const stylesArray = [styles.icon, { color }]
  return type === 'fa' ? <FontAwesome5 name={`${icon}`.split(' ')[1]} style={stylesArray} {...props} /> : <MaterialCommunityIcons name={icon} style={stylesArray} {...props} />
}

Icon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
}

Icon.defaultProps = {
  icon: null,
  color: COLORS.LIGHT_GRAY,
}

export default Icon
