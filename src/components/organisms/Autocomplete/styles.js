import { StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
  },
  inputRightIcon: {
    zIndex: 3,
    position: 'absolute',
    top: 16,
    right: 16,
  },
})

export default styles
