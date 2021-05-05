import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from 'components/atoms/Text'

import { getStyles, BUTTON_SCHEMES, STYLE_SCHEMES } from './styles'

const Button = props => {
  const { title, children, loading, disabled, containerStyle, style, textStyle, scheme, round, ...otherProps } = props
  const styles = getStyles({...props, scheme: disabled ? BUTTON_SCHEMES.INACTIVE : scheme})
  const styleScheme = get(STYLE_SCHEMES, disabled ? BUTTON_SCHEMES.INACTIVE : scheme, STYLE_SCHEMES.primary)
  const showTitle = title && !loading
  const showChildren = children && !loading
  const isDisabled = disabled || loading
  const roundStyle = { paddingHorizontal: 0, width: 48, height: 48 }
  return (
    <View testID="button-container" style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        disabled={isDisabled}
        style={[styles.button, styleScheme, round ? roundStyle : null, style]}
        {...otherProps}
      >
        {showTitle ? (
          <Text bold style={[styles.text, textStyle]}>
            {title}
          </Text>
        ) : null}
        {loading ? <ActivityIndicator testID="activity-indicator" size="small" color={styles.text.color} /> : null}
        {showChildren ? <View>{children}</View> : null}
      </TouchableOpacity>
    </View>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  scheme: PropTypes.oneOf([
    BUTTON_SCHEMES.PRIMARY,
    BUTTON_SCHEMES.INACTIVE,
    BUTTON_SCHEMES.SECONDARY,
    BUTTON_SCHEMES.PRIMARY_OUTLINE,
    BUTTON_SCHEMES.PRIMARY_LINK,
    BUTTON_SCHEMES.SECONDARY_LINK,
  ]),
  containerStyle: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  children: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  title: '',
  scheme: 'primary',
  containerStyle: {},
  textStyle: {},
  style: {},
  children: null,
  loading: false,
  disabled: false,
}

export default Button
