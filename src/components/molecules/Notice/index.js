import React from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'

import image from '../../../../assets/images/something_wrong.gif'

import Header from 'components/molecules/Header'
import Button from 'components/molecules/Button'
import Row from 'components/atoms/Row'

import styles from './styles'

const Notice = ({ description, buttonDescription = i18n.t('notice.tryAgain'), onPressRetry }) => (
  <View style={styles.container} accessibilityLabel="notice">
    <Header title={description} titleStyle={styles.textDescription} />
    <View style={styles.centerImageContainer}>
      <Image style={styles.image} source={image} accessibilityLabel="notice-image" />
    </View>
    <Row style={styles.button}>
      <Button title={buttonDescription} onPress={onPressRetry} accessibilityLabel="notice-button" />
    </Row>
  </View>
)

Notice.propTypes = {
  description: PropTypes.string.isRequired,
  onPressRetry: PropTypes.func.isRequired,
  buttonDescription: PropTypes.string,
}

Notice.defaultProps = {
  buttonDescription: null,
}

export default Notice
