import Icon from 'components/atoms/Icon'
import Row from 'components/atoms/Row'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'
import { COLORS } from 'services/style'
import styles from './styles'

const UserFeedbackMessage = ({
  iconName,
  title,
  subtitle,
  paragraph,
  imageSource,
  submitTitle,
  onSubmit,
  imageOnTop,
  styleTitle,
  styleSubtitle,
  styleParagraph,
  accessibilityLabel,
  submitAccessibilityLabel,
  isLoading,
  ...otherProps
}) => {
  const renderImage = label => (
    <Row style={styles.imageWrapper}>
      <Image style={styles.image} source={imageSource} accessibilityLabel={`${accessibilityLabel}-${label}`} />
    </Row>
  )
  return (
    <View style={styles.container} {...otherProps} accessibilityLabel={accessibilityLabel}>
      {iconName ? <Icon style={styles.icon} name={iconName} color={COLORS.DANGER} /> : null}
      {imageOnTop ? renderImage('image-on-top') : null}
      {title ? <Text style={[styles.text, styles.title, styleTitle]}>{title}</Text> : null}
      {subtitle ? <Text style={[styles.text, styles.subtitle, styleSubtitle]}>{subtitle}</Text> : null}
      {paragraph ? <Text style={[styles.text, styleParagraph]}>{paragraph}</Text> : null}
      {!imageOnTop ? renderImage('image-on-bottom') : null}
      <Row style={styles.buttonWrapper}>
        <Button
          disabled={isLoading}
          title={submitTitle}
          accessibilityLabel={submitAccessibilityLabel || `${accessibilityLabel}-submit-button`}
          onPress={onSubmit}
        />
      </Row>
    </View>
  )
}

UserFeedbackMessage.propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  paragraph: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  imageSource: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]).isRequired,
  submitTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  imageOnTop: PropTypes.bool,
  styleTitle: PropTypes.shape({}),
  styleSubtitle: PropTypes.shape({}),
  styleParagraph: PropTypes.shape({}),
  submitAccessibilityLabel: PropTypes.string,
  isLoading: PropTypes.bool,
}

UserFeedbackMessage.defaultProps = {
  iconName: '',
  title: '',
  subtitle: '',
  paragraph: '',
  accessibilityLabel: 'user-feedback-message',
  onSubmit: () => {},
  imageOnTop: false,
  styleTitle: null,
  styleSubtitle: null,
  styleParagraph: null,
  submitAccessibilityLabel: '',
  isLoading: false,
}

export default UserFeedbackMessage
