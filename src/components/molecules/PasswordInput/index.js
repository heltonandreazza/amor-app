import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Entypo } from '@expo/vector-icons'


import { COLORS } from 'services/style'
import Input from 'components/molecules/Input'

export const rightIconContainerStyle = {
  zIndex: 3,
  position: 'absolute',
  top: 12,
  right: 16,
}

const PasswordInput = ({ value, onBlur, onFocus, ...otherProps }) => {
  const [shouldInputBeSecure, setShouldInputBeSecure] = useState(true)
  const [isFocused, setIsFocused] = useState(false)

  const handleBlur = () => {
    if (!value) setIsFocused(false)
    onBlur()
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus()
  }

  const RightIconForPasswordField = () => (
    <Entypo
      testID={shouldInputBeSecure ? 'eye-with-line' : 'eye'}
      name={shouldInputBeSecure ? 'eye-with-line' : 'eye'}
      size={25}
      color={COLORS.GRAY}
      onPress={() => {
        setShouldInputBeSecure(!shouldInputBeSecure)
      }}
      style={rightIconContainerStyle}
    />
  )

  return (
    <Input
      testID="input-password"
      name="password"
      rightIcon={<RightIconForPasswordField />}
      rightIconContainerStyle={isFocused ? rightIconContainerStyle : { marginRight: 8 }}
      secureTextEntry={shouldInputBeSecure}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={value}
      {...otherProps}
    />
  )
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
}

PasswordInput.defaultProps = {
  value: '',
  onFocus: () => {},
  onBlur: () => {},
}

export default PasswordInput
