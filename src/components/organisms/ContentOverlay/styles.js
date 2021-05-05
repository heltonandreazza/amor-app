import { StyleSheet } from 'react-native'
import { COLORS, FONT_SIZES } from 'services/style'

const containerBaseStyles = {
  backgroundColor: COLORS.WHITE,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingTop: 16,
  paddingHorizontal: 16,
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    margin: 0,
  },
  modalContainer: {
    ...containerBaseStyles,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    marginVertical: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    marginBottom: 32,
  },
  secondaryButtonText: {
    color: COLORS.PRIMARY,
    marginVertical: 16,
  },
  spacer: {
    height: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    height: 48,
    marginBottom: 16,
  },
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.DARK_GRAY,
  },
  subtitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.DARK_GRAY,
  },
})

export default styles
