import { when } from 'mobx'
import { types, onSnapshot, applySnapshot, addDisposer, destroy } from 'mobx-state-tree'
import { AsyncStorage } from 'react-native'

import { logout, isAuthenticated } from 'services/Auth'
import { setStorageItem, getStorageItem } from 'services/storage'

import { UserModel } from './UserStore'
import { ProfileModel } from './ProfileStore'

const APP_STORE_KEY = 'APP_STORE_KEY'

const AppStore = types
  .model('AppStore', {
    idAc: '',
    user: types.maybeNull(UserModel),
    profile: types.maybeNull(ProfileModel),
    isReady: false,
  })
  .views(self => ({
    get isUserLogged() {
      return !!(self.user && self.user.token)
    },
  }))
  .actions(self => ({
    // actions:
    setReady(isReady) {
      self.isReady = isReady
    },
    setUser(user) {
      console.log('setUser', user)
      self.user = user
    },
    setProfile(profile) {
      self.profile = profile
    },
    setIdAc(idAc) {
      self.idAc = idAc
    },
    logout() {
      destroy(self.user)
      if (self.profile) destroy(self.profile)
      logout()
    },
    // bootstrap:
    afterCreate() {
      when(() => self.isUserLogged && self.isReady, self.logUserInformation)

      const autoSaveDisposer = onSnapshot(self, snapshot => setStorageItem(AsyncStorage, APP_STORE_KEY, snapshot))
      addDisposer(self, autoSaveDisposer)
      self.bootstrap()
    },
    async bootstrap() {
      try {
        const appStoreSnapshot = await getStorageItem(AsyncStorage, APP_STORE_KEY, {})
        applySnapshot(self, appStoreSnapshot)
      } catch (e) {
        console.log(`[logException] bootstrap: ${e}`)
      } finally {
        self.setReady(true)
      }
    },
    // side-effects:
    logUserInformation() {
      // Sentry.setUserContext({
      //   email: get(self.user, 'email', ''),
      // })
    },
  }))

export const appStore = AppStore.create()
