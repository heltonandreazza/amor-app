import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { FEEDBACK } from 'services/constants'
import Text from 'components/atoms/Text'

import { getStyles } from './styles'

const Badge = ({ type, label, style }) => {
  const styles = getStyles(type)
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  )
}

Badge.propTypes = {
  type: PropTypes.oneOf([FEEDBACK.SUCCESS, FEEDBACK.DANGER, FEEDBACK.WARNING, FEEDBACK.INACTIVE]),
  label: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}

Badge.defaultProps = {
  type: FEEDBACK.SUCCESS,
  style: null,
}

export default Badge
