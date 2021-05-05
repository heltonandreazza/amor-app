import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { COLORS } from 'services/style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.OFF_WHITE,
    flex: 1,
  },
  statusBar: {
    height: getStatusBarHeight(),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
})

export default styles
