import { FEEDBACK } from 'services/constants'
import { COLORS, FONT_SIZES } from 'services/style'

const badgesTypes = {
  [FEEDBACK.DANGER]: { backgroundColor: COLORS.DANGER },
  [FEEDBACK.SUCCESS]: { backgroundColor: COLORS.PRIMARY },
  [FEEDBACK.WARNING]: { backgroundColor: COLORS.WARNING },
  [FEEDBACK.INACTIVE]: { backgroundColor: COLORS.GRAY },
}

export const getStyles = type => ({
  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 16,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    marginBottom: 8,
    backgroundColor: COLORS.PRIMARY,
    ...badgesTypes[type],
  },
  badgeLabel: {
    color: COLORS.WHITESMOKE,
    fontSize: FONT_SIZES.small,
  },
})
