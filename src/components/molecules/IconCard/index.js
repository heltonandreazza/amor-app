import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'components/atoms/Icon'
import Text from 'components/atoms/Text'

import { COLORS, ICON_SIZE } from 'services/style'

import ElevatedView from 'components/atoms/ElevatedView'
import styles from './styles'

const IconCard = ({
  onPress,
  description,
  description2,
  children,
  iconName,
  rightIconName,
  showRightIconNameSpacer,
  iconColor,
  rightIconColor,
  textColor,
  height,
  elevation,
  textStyle,
  descriptionStyle,
  imageSource,
  iconNumber,
  styleImage,
  styleImageWrapper,
  hideIconSpacer,
  ...otherProps
}) => {
  const IconSpacer = () => !iconNumber && !imageSource && !hideIconSpacer ? <View style={styles.iconButton} /> : null
  const RightIconSpacer = () => showRightIconNameSpacer ? <View style={styles.iconButton} /> : null
  return (
    <ElevatedView elevation={elevation}>
      <TouchableOpacity
        testID="icon-card-button"
        accessibilityLabel="icon-card-button"
        style={[styles.container, { height }]}
        onPress={onPress}
        disabled={!onPress}
        {...otherProps}
      >
        {iconName ? (
          <View style={styles.iconButton} >
            <Icon
              icon={iconName}
              size={ICON_SIZE}
              color={iconColor}
            />
          </View>
        ): (
          <IconSpacer />
        )}
        {iconNumber && (
          <View style={styles.iconButton} >
            <View style={styles.iconNumberWrapper}>
              <Text medium style={{ color: COLORS.PRIMARY }}>
                {iconNumber}
              </Text>
            </View>
          </View>
        )}
        {imageSource && (
          <ElevatedView elevation={8} style={[styles.imageWrapper, styleImageWrapper]}>
            <Image
              source={imageSource}
              style={[styles.tinyLogo, styleImage]}
            />
          </ElevatedView>
        )}
        {description && (
          <View style={[styles.text, descriptionStyle]}>
            <Text medium style={{ color: textColor }}>
              {description}
            </Text>
          </View>
        )}
        {typeof description2 === 'string' && (
          <View style={styles.text2}>
            <Text medium style={{ color: COLORS.NIGHT_RIDER, ...textStyle}}>
              {description2}
            </Text>
          </View>
        )}
        {children}
        {rightIconName ? (
          <View style={styles.iconButton} >
            <Icon
              icon={rightIconName}
              size={ICON_SIZE}
              color={rightIconColor}
            />
          </View>
        ) : (
          <RightIconSpacer />
        )}
      </TouchableOpacity>
    </ElevatedView>
  )
}

IconCard.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string.isRequired,
  rightIconName: PropTypes.string,
  rightIconColor: PropTypes.string,
  showRightIconNameSpacer: PropTypes.string,
  imageSource: PropTypes.shape(),
  iconColor: PropTypes.string,
  description: PropTypes.string,
  description2: PropTypes.string,
  children: PropTypes.node,
  textColor: PropTypes.string,
  textStyle: PropTypes.shape(),
  descriptionStyle: PropTypes.shape(),
  height: PropTypes.number,
  elevation: PropTypes.number,
  iconNumber: PropTypes.string,
}

IconCard.defaultProps = {
  children: null,
  iconColor: COLORS.DARK_GRAY,
  rightIconColor: COLORS.DARK_GRAY,
  textColor: COLORS.DARK_GRAY,
  textStyle: null,
  descriptionStyle: null,
  height: 72,
  onPress: null,
  elevation: 4,
  description: null,
  description2: null,
  rightIconName: null,
  iconNumber: null,
}

export default IconCard
