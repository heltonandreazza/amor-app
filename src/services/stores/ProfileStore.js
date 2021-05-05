import { types } from 'mobx-state-tree'
import first from 'lodash/first'

export const ProfileModel = types
  .model('Profile', {
    id: types.string,
    birthDate: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    firstCpf: types.maybeNull(types.string),
    frequency: types.maybeNull(types.number),
    name: types.maybeNull(types.string),
    objective: types.maybeNull(types.string),
    responsable: types.maybeNull(types.string),
    situation: types.maybeNull(types.string),
    subscription: types.maybeNull(types.string),
    sex: types.maybeNull(types.string),
  })
  .views(self => ({
    get age() {
      if (!self.birthDate) return
      const currentYear = new Date().getFullYear()
      const birthYear = first(self.birthDate.split('-'))
      return  currentYear - birthYear
    },
  }))
