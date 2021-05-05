import { StyleSheet } from 'react-native'

import { COLORS } from 'services/style'

export const alertsTypes = {
  danger: { backgroundColor: COLORS.DANGER_BACKGROUND, color: COLORS.DANGER },
  success: { backgroundColor: COLORS.SUCCESS_BACKGROUND, color: COLORS.SUCCESS },
  warning: { backgroundColor: COLORS.WARNING_BACKGROUND, color: COLORS.WARNING },
}

export const getStyles = type => {
  return StyleSheet.create({
    message: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 8,
      paddingRight: 8,
    },
    alertsType: alertsTypes[type],
  })
}
