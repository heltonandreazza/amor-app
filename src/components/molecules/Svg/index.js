import Svg, { Circle, Text, Polygon, Rect, Image, Defs, ClipPath } from 'react-native-svg'

import React from 'react'
import { View, StyleSheet } from 'react-native'
import headerGymImage from '../../../../assets/images/header_gym.png'
import { SCREEN_WIDTH } from 'services/style'

export const SvgExample = () => {
  const screenWidth = SCREEN_WIDTH
  const screenWidth48 = screenWidth * 0.48
  const screenWidth66 = screenWidth * 0.66
  const screenWidth51 = screenWidth * 0.51
  const screenWidth33 = screenWidth * 0.33
  const points = `
    0,0 
    ${screenWidth},0 
    ${screenWidth},${screenWidth48} 
    ${screenWidth66},${screenWidth51} 
    ${screenWidth33},${screenWidth51} 
    0,${screenWidth48}
  `
  return (
    <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
      <Svg height="100%" width="100%">
        <Defs>
          <ClipPath id="clip">
            <Polygon points={points} fill="lime" stroke="purple" strokeWidth="1" />
          </ClipPath>
        </Defs>

        <Image
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          href={headerGymImage}
          clipPath="url(#clip)"
        />
      </Svg>
    </View>
  )
}

export const SvgHeaderGym = () => (
  <Svg height="100" width="100">
    <Defs>
      <ClipPath id="clip">
        <Circle cx="50%" cy="50%" r="40%" />
      </ClipPath>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="red" />
    <Rect x="5%" y="5%" width="50%" height="90%" />

    <Image
      x="5%"
      y="5%"
      width="50%"
      height="90%"
      preserveAspectRatio="xMidYMid slice"
      opacity="0.5"
      href={require('../../../../assets/images/header_gym.png')}
      clipPath="url(#clip)"
    />
    <Text x="50" y="50" textAnchor="middle" fontWeight="bold" fontSize="16" fill="blue">
      HOGWARTS
    </Text>
  </Svg>
)
