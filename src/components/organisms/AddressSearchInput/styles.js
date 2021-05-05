import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const windowSize = Dimensions.get('window')

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    maxWidth: windowSize.width * 0.8,
    maxHeight: windowSize.height * 0.4,
    resizeMode: 'contain',
  },
  wrapperNotFound: {
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  callToAction: {
    color: COLORS.ORANGE,
  },
  subtitle: {
    color: COLORS.DARK_GRAY,
  },
})

export default styles
