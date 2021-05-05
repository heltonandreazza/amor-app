import { COLORS } from 'services/style'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  flexContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  smallLoading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  loadingText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: 8,
  },
})

export default styles
