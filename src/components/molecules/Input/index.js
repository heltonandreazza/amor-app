import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, ViewPropTypes } from 'react-native'

import Text from 'components/atoms/Text'
import styles from './styles'

const Input = ({
  errorMessage,
  label,
  value,
  hasError,
  rightIcon,
  containerStyle,
  inputStyle,
  inputRef: outerInputRef,
  validationTip,
  ...otherProps
}) => {
  const innerInputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = outerInputRef || innerInputRef
  const isTopLabel = isFocused || value

  return (
    <View style={styles.wrapper}>
      <View
        style={[hasError || errorMessage ? styles.errorContainerStyle : styles.container, containerStyle]}
        testID="input-view"
      >
        {label ? (
          <Text
            onPress={() => {
              setIsFocused(true)
              inputRef.current.focus()
            }}
            style={isTopLabel ? styles.topLabel : styles.label}
          >
            {label}
          </Text>
        ) : null}
        <TextInput
          testID="text-input"
          style={[label ? styles.inputWithLabel : styles.input, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          value={value}
          {...otherProps}
        />
        {rightIcon}
      </View>
      {validationTip ? (
        <Text bold shadow accessibilityLabel="validation-tip" style={styles.validationTip}>
          {validationTip}
        </Text>
      ) : null}
      {errorMessage ? (
        <View style={styles.errorMessageContainer}>
          <Text bold shadow accessibilityLabel="message-error" style={styles.errorStyle}>
            {`${errorMessage}`}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

Input.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  hasError: PropTypes.bool,
  rightIcon: PropTypes.node,
  containerStyle: ViewPropTypes.style,
  inputRef: PropTypes.shape(),
  inputStyle: TextInput.propTypes.style,
  validationTip: PropTypes.string,
}

Input.defaultProps = {
  errorMessage: '',
  label: '',
  value: '',
  onChangeText: () => {},
  hasError: false,
  rightIcon: null,
  containerStyle: {},
  inputRef: null,
  inputStyle: {},
  validationTip: null,
}

export default Input
