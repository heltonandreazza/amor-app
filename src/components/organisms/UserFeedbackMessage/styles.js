import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const windowSize = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    color: COLORS.DARK_GRAY,
  },
  text: {
    paddingTop: 8,
    textAlign: 'center',
  },
  imageWrapper: {
    paddingVertical: 42,
    justifyContent: 'center',
  },
  image: {
    maxWidth: Math.floor(windowSize.width * 0.6),
    maxHeight: Math.floor(windowSize.height * 0.3),
    resizeMode: 'contain',
  },
  buttonWrapper: {
    paddingVertical: 16,
  },
})

export default styles
