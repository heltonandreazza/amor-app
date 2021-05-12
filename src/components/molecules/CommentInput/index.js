import Text from 'components/atoms/Text'
import Input from 'components/molecules/Input'
import React, { useState } from 'react'
import { View } from 'react-native'
import styles from './styles'

const CommentInput = ({ onChangeText, ...otherProps }) => {
  const [textLength, setTextLength] = useState(0)

  return (
    <View style={styles.wrapper}>
      <Input
        multiline
        {...otherProps}
        containerStyle={styles.container}
        maxLength={otherProps.maxLength}
        onChangeText={value => {
          onChangeText(value)
          setTextLength(value.length)
        }}
      />
      <Text style={styles.validationTip}>
        {otherProps.maxLength ? `${textLength}/${otherProps.maxLength}` : null}
      </Text>
    </View>
  )
}

CommentInput.propTypes = Input.propTypes
CommentInput.defaultProps = Input.defaultProps

export default CommentInput
