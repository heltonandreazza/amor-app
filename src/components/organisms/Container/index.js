import React from 'react'
import PropTypes from 'prop-types'
import { View, Animated } from 'react-native'

import { Alert } from 'components/molecules/Alert'
import Loading from 'components/atoms/Loading'
import Header from 'components/molecules/Header'
import StatusBarColor from 'components/molecules/StatusBarColor'

import { COLORS } from 'services/style'
import styles from './styles'

const Container = ({
  title,
  backTo,
  children,
  isLoading,
  topComponent,
  refreshControl,
  containerStyle,
  backgroundColor,
  contentScrollProps,
  contentContainerStyle,
  titleAccessibilityLabel,
  statusBarBackgroundColor,
  testID,
}) => {
  return (
    <View style={{ flex: 1 }} testID={testID}>
      <StatusBarColor backgroundColor={statusBarBackgroundColor} barStyle="light-content" />
      <Alert />
      <View style={[styles.container, containerStyle]}>
        {topComponent || null}
        {title && (
          <Header
            testID={titleAccessibilityLabel}
            titleAccessibilityLabel={titleAccessibilityLabel}
            title={title}
            backTo={backTo}
            backgroundColor={backgroundColor}
          />
        )}
        <Animated.ScrollView
          scrollEnabled
          refreshControl={refreshControl}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
          {...contentScrollProps}
        >
          {children}
        </Animated.ScrollView>
      </View>
      {isLoading ? <Loading testID="container-loader" accessibilityLabel="container-loader" fullScreen /> : null}
    </View>
  )
}

Container.propTypes = {
  backTo: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  topComponent: PropTypes.node,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  backgroundColor: PropTypes.string,
  absoluteComponent: PropTypes.node,
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.objectOf(PropTypes.shape),
  titleAccessibilityLabel: PropTypes.string,
  contentContainerStyle: PropTypes.objectOf(PropTypes.shape),
  refreshControl: PropTypes.objectOf(PropTypes.shape),
  contentScrollProps: PropTypes.objectOf(PropTypes.shape),
  statusBarBackgroundColor: PropTypes.string,
  testID: PropTypes.string,
}

Container.defaultProps = {
  title: null,
  backTo: null,
  isLoading: false,
  topComponent: null,
  errorMessage: null,
  containerStyle: {},
  refreshControl: null,
  warningMessage: null,
  successMessage: null,
  contentScrollProps: {},
  absoluteComponent: null,
  contentContainerStyle: {},
  titleAccessibilityLabel: 'container-header',
  backgroundColor: COLORS.WHITE,
  statusBarBackgroundColor: COLORS.PRIMARY,
  testID: 'container',
}

export default Container
