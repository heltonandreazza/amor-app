import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import IconCard from 'components/molecules/IconCard'
import Text from 'components/atoms/Text'

import styles from './styles'

const AddressCard = ({ title, subtitle, onPress }) => (
  <IconCard accessibilityLabel={`address-card-${title} ${subtitle}`} iconName="map-marker-outline" onPress={onPress}>
    <View style={styles.wrapperText}>
      <Text medium>{title}</Text>
      <Text>{subtitle}</Text>
    </View>
  </IconCard>
)

AddressCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

AddressCard.defaultProps = {
  subtitle: '',
}

export default AddressCard
