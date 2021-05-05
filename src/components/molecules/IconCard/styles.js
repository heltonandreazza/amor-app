import { StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  iconButton: {
    justifyContent: 'center',
    padding: 16,
    minWidth: 48,
    minHeight: 48,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
  text2: {
    flex: 2,
    justifyContent: 'center',
  },
  imageWrapper: {
    justifyContent: 'center',
    margin: 16,
    width: 64,
    height: 64,
    borderRadius: 8
  },
  tinyLogo: {
    width: 64,
    height: 64,
    borderWidth: 2.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 8
  },
  iconNumberWrapper: {
    height: 24,
    width: 24,
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 12,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default styles
