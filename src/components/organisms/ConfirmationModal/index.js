import React from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'

import ContentOverlay from 'components/organisms/ContentOverlay'
import Text from 'components/atoms/Text'
import styles from './styles'

const ConfirmationModal = ({
  contentImage,
  contentText,
  primaryButtonTitle,
  onPrimaryButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress,
  ...otherProps
}) => (
  <ContentOverlay
    accessibilityLabel="confirmation-modal"
    buttonTitle={primaryButtonTitle || i18n.t('confirmationModal.primaryButtonTitle')}
    onButtonPress={onPrimaryButtonPress}
    linkText={secondaryButtonTitle || i18n.t('confirmationModal.secondaryButtonTitle')}
    onLinkPress={onSecondaryButtonPress}
    buttonTestID="primary-button-confirmation-modal"
    linkTestID="secondary-button-confirmation-modal"
    closeButtonTestID="close-button-confirmation-modal"
    {...otherProps}
  >
    {contentImage ? (
      <View style={styles.container}>
        <Image style={styles.image} source={contentImage} />
      </View>
    ) : null}
    <View style={styles.textContainer}>
      <Text testID="content-text" style={styles.contentText}>
        {contentText}
      </Text>
    </View>
  </ContentOverlay>
)

ConfirmationModal.propTypes = {
  contentImage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      uri: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      scale: PropTypes.number,
    }),
  ]),
  contentText: PropTypes.string.isRequired,
  primaryButtonTitle: PropTypes.string,
  secondaryButtonTitle: PropTypes.string,
  onPrimaryButtonPress: PropTypes.func,
  onSecondaryButtonPress: PropTypes.func,
}

ConfirmationModal.defaultProps = {
  contentImage: null,
  primaryButtonTitle: '',
  secondaryButtonTitle: '',
  onPrimaryButtonPress: null,
  onSecondaryButtonPress: null,
}

export default ConfirmationModal
