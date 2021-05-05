import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .6,
  },
})

export const buttonContainerColors = ['rgba(250, 250, 250, 0.24)', 'rgba(250, 250, 250, 1)']

export default styles
