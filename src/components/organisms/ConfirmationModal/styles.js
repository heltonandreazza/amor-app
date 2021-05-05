import { StyleSheet } from 'react-native'
import { FONT_SIZES } from 'services/style'

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    display: 'flex',
    height: 224,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  textContainer: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'center',
  },
  contentText: {
    lineHeight: FONT_SIZES.default * 1.4,
  },
})

export default styles
