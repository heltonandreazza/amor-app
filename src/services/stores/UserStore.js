import { types } from 'mobx-state-tree'
import get from 'lodash/get'

import { parseJwt } from 'services/utils'

export const AddressModel = types
  .model('AddressModel', {
    longitude: types.maybeNull(types.string),
    latitude: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    neighbordhood: types.maybeNull(types.string),
    zipcode: types.maybeNull(types.string),
    city: types.maybeNull(types.string),
    province: types.maybeNull(types.string),
  })
  .actions(self => ({
    setAddress({
      longitude,
      latitude,
      address,
      neighbordhood,
      zipcode,
      city,
      province,
    }) {
      self.longitude = longitude
      self.latitude = latitude
      self.address = address
      self.neighbordhood = neighbordhood
      self.zipcode = zipcode
      self.city = city
      self.province = province
    },
  }))

export const UserModel = types
  .model('User', {
    token: types.maybeNull(types.string),
    accessToken: types.maybeNull(types.string),
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
  })
  .views(self => ({
    get tokenExpirationDate() {
      const tokenPayload = parseJwt(self.accessToken)
      const tokenExpiration = get(tokenPayload, 'exp', 0) * 1000
      return tokenExpiration
    },
  }))
  .actions(self => ({
    setInfo({ 
      email = self.email,
      name = self.name,
      about = self.about,
      needs = self.needs,
      address = self.address,
      photos = self.photos,
      document = self.document,
      phone = self.phone,
    }) {
      self.email = email
      self.name = name
      self.about = about
      self.needs = needs
      self.address = address
      self.photos = photos
      self.document = document
      self.phone = phone
    },
    setToken(token) {
      self.token = token
    },
    setAccessToken(accessToken) {
      self.accessToken = accessToken
    },
  }))
