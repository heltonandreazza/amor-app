import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'
import Text from 'components/atoms/Text'
import { View, ActivityIndicator } from 'react-native'

import { COLORS } from 'services/style'

import styles from './styles'

const Loading = ({ fullScreen }) =>
  fullScreen ? (
    <View testID="full-screen-loader" accessibilityLabel="full-screen-loader" style={styles.fullScreenContainer}>
      <ActivityIndicator size="large" color={COLORS.WHITE} />
      <Text style={styles.loadingText}>{i18n.t('loading')}</Text>
    </View>
  ) : (
    <View testID="screen-loader" accessibilityLabel="screen-loader" style={styles.flexContainer}>
      <View style={styles.smallLoading}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    </View>
  )

Loading.propTypes = {
  fullScreen: PropTypes.bool,
}

Loading.defaultProps = {
  fullScreen: false,
}

export default Loading
