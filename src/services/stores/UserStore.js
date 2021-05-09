import { types } from 'mobx-state-tree'
import get from 'lodash/get'

import { parseJwt } from 'services/utils'

export const AddressModel = types
  .model('AddressModel', {
    longitude: types.maybeNull(types.number),
    latitude: types.maybeNull(types.number),
    address: types.maybeNull(types.string),
    neighborhood: types.maybeNull(types.string),
    zip: types.maybeNull(types.string),
    city: types.maybeNull(types.string),
    province: types.maybeNull(types.string),
  })
  .actions(self => ({
    setAddress({
      longitude,
      latitude,
      address,
      neighborhood,
      zip,
      city,
      province,
    }) {
      self.longitude = longitude
      self.latitude = latitude
      self.address = address
      self.neighborhood = neighborhood
      self.zip = zip
      self.city = city
      self.province = province
    },
  }))

export const UserModel = types
  .model('User', {
    token: types.maybeNull(types.string),
    refreshToken: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    sub: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    about: types.maybeNull(types.string),
    needs: types.maybeNull(types.string),
    address: types.maybeNull(AddressModel),
    photos: types.maybeNull(types.array(types.string)),
    document: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    profile: types.maybeNull(types.string),
  })
  .views(self => ({
    get tokenExpirationDate() {
      const expirationISODate = self.refreshToken
      return self.refreshToken ? new Date(expirationISODate) : null
    },
  }))
  .actions(self => ({
    setInfo({ 
      token = self.token,
      refreshToken = self.refreshToken,
      userId = self.userId,
      sub = self.sub,
      email = self.email,
      name = self.name,
      about = self.about,
      needs = self.needs,
      address = self.address,
      photos = self.photos,
      document = self.document,
      phone = self.phone,
      profile = self.profile,
    }) {
      // console.log('setInfo', {
      //   token,
      //   refreshToken,
      //   userId,
      //   sub,
      //   email,
      //   name,
      //   about,
      //   needs,
      //   address,
      //   photos,
      //   document,
      //   phone,
      //   profile,
      // })
      self.token = token
      self.refreshToken = refreshToken
      self.userId = userId
      self.sub = sub
      self.email = email
      self.name = name
      self.about = about
      self.needs = needs
      self.address = address
      self.photos = photos
      self.document = document
      self.phone = phone
      self.profile = profile
    },
    setToken(token) {
      self.token = token
    },
  }))
