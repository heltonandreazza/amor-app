import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'

import { COLORS } from 'services/style'

import IconCard from 'components/molecules/IconCard'

const MyLocationButton = ({ onPress }) => (
  <IconCard
    accessibilityLabel="my-location-button"
    textColor={COLORS.ORANGE}
    iconName="crosshairs-gps"
    description={i18n.t('myLocationButton.useMyLocation')}
    onPress={onPress}
  />
)

MyLocationButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default MyLocationButton
