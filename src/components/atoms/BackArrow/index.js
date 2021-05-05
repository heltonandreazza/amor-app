import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from 'services/style'

import styles from './styles'

const BackArrow = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} underlayColor="white" accessibilityLabel="Go Back" testID="back-arrow">
    <View style={[styles.backArrow, style]}>
      <Ionicons name="md-arrow-back" size={25} color={COLORS.WHITESMOKE} />
    </View>
  </TouchableOpacity>
)

BackArrow.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.shape),
}

BackArrow.defaultProps = {
  onPress: () => {},
  style: {},
}

export default BackArrow
