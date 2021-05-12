import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  title: {
    padding: 16,
    fontSize: 24,
    lineHeight: 28,
    width: 280,
    textAlign: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .25,
  },
  iconButton: {
    justifyContent: 'center',
    padding: 16,
    minWidth: 48,
    minHeight: 48,
  },
  inputWrapper: {
    display: 'flex',
    backgroundColor: COLORS.OFF_WHITE,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
})

export default styles
