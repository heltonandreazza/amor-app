import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Text from 'components/atoms/Text'
import BackArrow from 'components/atoms/BackArrow'

import { COLORS } from 'services/style'
import styles from './styles'

const Header = ({ title, backgroundColor, backTo, titleAccessibilityLabel, containerStyle, titleStyle }) => (
  <View style={[styles.headerContainer, { backgroundColor }, containerStyle]}>
    <View style={styles.headerStyle}>
      {backTo ? (
        <View style={styles.backArrow}>
          <BackArrow onPress={backTo} testID="back-arrow" />
        </View>
      ) : null}
      {title ? (
        <Text accessibilityLabel={titleAccessibilityLabel} style={[styles.defaultTitleStyle, titleStyle]} medium>
          {title.toUpperCase()}
        </Text>
      ) : null}
    </View>
  </View>
)

Header.propTypes = {
  title: PropTypes.string,
  backTo: PropTypes.func,
  backgroundColor: PropTypes.string,
  titleAccessibilityLabel: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
}

Header.defaultProps = {
  title: '',
  backgroundColor: '',
  titleAccessibilityLabel: '',
  backTo: null,
  containerStyle: null,
  titleStyle: null,
}

export default Header
