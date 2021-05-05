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
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
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
})

export default styles
