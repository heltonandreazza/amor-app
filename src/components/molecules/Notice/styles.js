import { StyleSheet } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.OFF_WHITE,
    flex: 1,
    flexGrow: 1,
  },
  centerImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 224,
    height: 184,
  },
  textDescription: {
    textTransform: 'lowercase',
    color: COLORS.NIGHT_RIDER,
  },
  button: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
})

export default styles
