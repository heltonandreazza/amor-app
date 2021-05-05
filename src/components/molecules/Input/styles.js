import { StyleSheet } from 'react-native'
import { borders, COLORS, defaultLateralPadding } from 'services/style'

const labelStyles = {
  left: 16,
  fontSize: 14,
  fontWeight: 'normal',
  color: COLORS.GRAY,
  position: 'absolute',
  zIndex: 2,
}

const containerStyles = {
  ...borders,
  width: '100%',
  height: 48,
  borderWidth: 1,
  backgroundColor: COLORS.WHITE,
}

const inputStyles = {
  ...defaultLateralPadding,
  borderRadius: 32,
  fontSize: 14,
  width: '100%',
  height: 48,
  position: 'absolute',
  top: 6,
  zIndex: 1,
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    ...containerStyles,
  },
  label: {
    ...labelStyles,
    top: 12,
  },
  topLabel: {
    ...labelStyles,
    top: 4,
  },
  inputContainer: {
    paddingLeft: 6,
    borderBottomColor: 'transparent',
  },
  errorMessageContainer: {
    marginTop: 4,
    position: 'relative',
  },
  errorStyle: {
    borderColor: COLORS.DANGER,
    color: COLORS.DANGER,
    fontSize: 12,
  },
  errorContainerStyle: {
    ...containerStyles,
    borderColor: COLORS.DANGER,
  },
  input: inputStyles,
  inputWithLabel: {
    ...inputStyles,
  },
  validationTip: {
    textAlign: 'right',
  },
})

export default styles
