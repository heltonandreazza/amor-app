import React from 'react'
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const StatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

StatusBarColor.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
}

export default StatusBarColor
