import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  header: {
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imagesWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 2.5,
    borderColor: COLORS.PRIMARY,
    borderRadius: 500,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
  headerText: {
    backgroundColor: COLORS.OFF_WHITE
  },
  viewData: { 
    height: Dimensions.get('window').height * .35,
    flex: 1,
    backgroundColor: COLORS.GRAY
  }
})

export default styles
