import React from 'react'
import { View, Animated } from 'react-native'
import { observer, useObserver } from 'mobx-react-lite'
import { useAnimation } from 'react-native-animation-hooks'

import Text from 'components/atoms/Text'
import { alertStore } from 'services/stores/AlertStore'

import { getStyles } from './styles'

export const Alert = observer(() => {
  const { isVisible, message, type } = alertStore
  const animateVisibility = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: isVisible ? 1 : 0,
    duration: 300,
    useNativeDriver: true,
  })
  const style = getStyles(type)
  const charsPerLine = 40
  const lineHeight = 24
  const lines = Math.ceil(message.length / charsPerLine)
  const outputMaxRange = lines * lineHeight
  // {
  //   height: animateVisibility.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [0, outputMaxRange],
  //   }),
  // }
  return useObserver(() => (
    <Animated.View
      accessibilityLabel="header-message"
      testID="alert-container"
      style={[style.message, style.alertsType]}
    >
      {
        isVisible ?
         <Text medium style={{ color: style.alertsType.color }}>
          {message}
        </Text>
        : null
      }
    </Animated.View>
  ))
})
