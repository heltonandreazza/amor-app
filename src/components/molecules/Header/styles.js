import { StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    minHeight: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.PRIMARY,
  },
  defaultTitleStyle: {
    color: COLORS.WHITESMOKE,
    marginHorizontal: 32,
    textAlign: 'center',
  },
  backArrow: {
    position: 'absolute',
    left: 0,
  },
})

export default styles
