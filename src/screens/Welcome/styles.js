import { StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  title: {
    padding: 16,
    fontSize: 24,
    lineHeight: 28,
    width: 280,
    textAlign: 'center',
  },
  image: {
    marginTop: 16,
    width: 224,
    height: 172,
  },
  buttonContainer: {
    marginTop: 54,
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
  },
  button: {
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.TRANSPARENT,
  },
})

export default styles
