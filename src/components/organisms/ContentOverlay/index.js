import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import Modal from 'react-native-modal'
import Feather from 'react-native-vector-icons/Feather'

import { COLORS, ICON_SIZE } from 'services/style'
import Button from 'components/molecules/Button'
import { BUTTON_SCHEMES } from 'components/molecules/Button/styles'
import Text from 'components/atoms/Text'
import styles from './styles'

const ContentOverlay = ({
  isVisible,
  customContainerStyle,
  title,
  subtitle,
  buttonTitle,
  linkText,
  isButtonLoading,
  children,
  onBackdropPress,
  onButtonPress,
  onLinkPress,
  onCloseButtonPress,
  onShow,
  isButtonDisabled,
  buttonTestID,
  closeButtonTestID,
  linkTestID,
  ...otherProps
}) => {
  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      animationInTiming={100}
      backdropOpacity={0.4}
      style={styles.modal}
      isVisible={isVisible}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      onModalShow={onShow}
      avoidKeyboard
      {...otherProps}
    >
      <View style={[styles.modalContainer, customContainerStyle]}>
        <View style={styles.modalHeader}>
          <View style={styles.containerTitle}>
            <Text style={styles.title} medium numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          <View style={{ position: 'absolute', top: 0, right: 0 }}>
            <Button
              testID={closeButtonTestID}
              accessibilityLabel={closeButtonTestID}
              onPress={onCloseButtonPress}
              scheme={BUTTON_SCHEMES.SECONDARY_LINK}
            >
              <Feather name="x" size={ICON_SIZE} color={COLORS.LIGHT_GRAY} />
            </Button>
          </View>
        </View>
        {children}
        {onButtonPress ? (
          <View style={styles.button}>
            <Button
              loading={isButtonLoading}
              style={{ marginBottom: linkText ? 0 : 16 }}
              testID={buttonTestID}
              accessibilityLabel={buttonTestID}
              onPress={onButtonPress}
              title={buttonTitle}
              disabled={isButtonDisabled}
              scheme={isButtonDisabled ? BUTTON_SCHEMES.INACTIVE : BUTTON_SCHEMES.PRIMARY}
            />
          </View>
        ) : null}
        {onLinkPress ? (
          <View style={styles.secondaryButton}>
            <Button
              testID={linkTestID}
              accessibilityLabel={linkTestID}
              onPress={onLinkPress}
              scheme={BUTTON_SCHEMES.PRIMARY_LINK}
            >
              <Text style={styles.secondaryButtonText}>{linkText}</Text>
            </Button>
          </View>
        ) : null}
      </View>
    </Modal>
  )
}

ContentOverlay.propTypes = {
  isVisible: PropTypes.bool,
  customContainerStyle: ViewPropTypes.style,
  onShow: PropTypes.func,
  onBackdropPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  onLinkPress: PropTypes.func,
  onCloseButtonPress: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonTitle: PropTypes.string,
  linkText: PropTypes.string,
  children: PropTypes.node.isRequired,
  isButtonLoading: PropTypes.bool,
  isButtonDisabled: PropTypes.bool,
  buttonTestID: PropTypes.string,
  closeButtonTestID: PropTypes.string,
  linkTestID: PropTypes.string,
}

ContentOverlay.defaultProps = {
  isVisible: false,
  customContainerStyle: {},
  subtitle: '',
  buttonTitle: '',
  linkText: '',
  title: '',
  onShow: () => {},
  onBackdropPress: () => {},
  onButtonPress: null,
  onLinkPress: null,
  onCloseButtonPress: () => {},
  isButtonLoading: false,
  isButtonDisabled: false,
  buttonTestID: 'primary-modal-button',
  closeButtonTestID: 'close-modal-button',
  linkTestID: 'secondary-modal-button',
}

export default ContentOverlay
