import { types } from 'mobx-state-tree'

import { FEEDBACK } from 'services/constants'

const AlertModel = types
  .model('Alert', {
    message: types.optional(types.string, ''),
    type: types.optional(types.enumeration('FEEDBACK', Object.values(FEEDBACK)), FEEDBACK.SUCCESS),
    isVisible: types.optional(types.boolean, false),
  })
  .actions(self => {
    let alertTimeout
    return {
      setAlert({ message = '', type = FEEDBACK.SUCCESS, timing = 6000 }) {
        self.message = message
        self.type = type
        self.isVisible = true

        clearTimeout(alertTimeout)
        alertTimeout = setTimeout(self.closeAlert, timing)
      },
      closeAlert() {
        self.isVisible = false
      },
    }
  })

export const alertStore = AlertModel.create()
