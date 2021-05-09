import { StyleSheet } from 'react-native'

const INPUT_HEIGHT = 82

const styles = StyleSheet.create({
  container: {
    height: INPUT_HEIGHT + 2,
  },
  input: {
    height: INPUT_HEIGHT,
    textAlignVertical: 'top',
  },
  validationTip: {
    textAlign: 'right',
  },
  wrapper: {
    marginBottom: 8,
  },
})

export default styles
