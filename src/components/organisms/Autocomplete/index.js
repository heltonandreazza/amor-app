import Icon from 'components/atoms/Icon'
import Loading from 'components/atoms/Loading'
import Row from 'components/atoms/Row'
import Input, { INPUT_SCHEMES } from 'components/molecules/Input'
import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, Keyboard, View } from 'react-native'
import { COLORS } from 'services/style'
import styles from './styles'

const Autocomplete = ({ isLoading, onClearPress, inputProps, flatListProps }) => {
  const shouldShowClearButton = onClearPress && inputProps.value

  const CustomRightIcon = () =>
    shouldShowClearButton ? (
      <Icon name="close" style={styles.inputRightIcon} color={COLORS.GRAY} onPress={onClearPress} />
    ) : null

  return (
    <>
      {isLoading ? <Loading fullScreen /> : null}
      <View style={styles.container}>
        <Row style={{ paddingTop: 16, paddingHorizontal: 8 }}>
          <Input
            inputRef={inputProps.inputRef}
            errorMessage={inputProps.errorMessage}
            scheme={inputProps.errorMessage && INPUT_SCHEMES.DANGER}
            customRightIcon={<CustomRightIcon />}
            {...inputProps}
          />
        </Row>

        <FlatList keyboardShouldPersistTaps="handled" onScrollBeginDrag={Keyboard.dismiss} {...flatListProps} />
      </View>
    </>
  )
}

Autocomplete.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClearPress: PropTypes.func,
  inputProps: PropTypes.shape({
    accessibilityLabel: PropTypes.string,
    inputRef: PropTypes.object,
    value: PropTypes.string,
    label: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    errorMessage: PropTypes.string,
  }).isRequired,
  flatListProps: PropTypes.shape({
    accessibilityLabel: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
    renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    keyExtractor: PropTypes.func.isRequired,
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    ListHeaderComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  }).isRequired,
}

Autocomplete.defaultProps = {
  onClearPress: () => {},
}

export default Autocomplete
