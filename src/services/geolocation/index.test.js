import { fetchMocks } from 'services/tests/mocks'
import * as geolocation from '.'

import placeAutocompleteRuaBarataRibeiro from './testStubs/place-autocomplete--rua-barata-ribeiro-284.json'
import placeDetailsRuaBarataRibeiro from './testStubs/place-details--rua-barata-ribeiro-284.json'

const placeIdRuaBarataRibeiro = placeDetailsRuaBarataRibeiro.result.place_id
const mappedAddressRuaBarataRibeiro = {
  city: 'São Paulo',
  country: 'BR',
  latitude: -23.5563256,
  longitude: -46.65317150000001,
  neighborhood: 'Bela Vista',
  number: '284',
  province: 'SP',
  street: 'Rua Barata Ribeiro',
  zipcode: '01308-000',
}

jest.mock('expo-location', () => ({
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: -23.5563256,
        longitude: -46.65317150000001,
      },
    })
  ),
  requestPermissionsAsync: jest.fn(() =>
    Promise.resolve({
      status: 'granted'
    })
  ),
}))

describe('geolocation', () => {
  it('getCurrentUserAddress', async () => {
    const fetchMockedResponses = {
      getGeolocationByCoordinates: { results: [{ place_id: placeIdRuaBarataRibeiro }] },
      getGeolocationByPlaceId: placeDetailsRuaBarataRibeiro,
    }

    fetchMocks(fetchMockedResponses.getGeolocationByCoordinates, fetchMockedResponses.getGeolocationByPlaceId)

    const result = await geolocation.getCurrentUserAddress()
    expect(result).toMatchObject(mappedAddressRuaBarataRibeiro)
  })

  it('getUserAddressByPlaceId', async () => {
    const fetchMockedResponses = {
      getGeolocationByPlaceId: placeDetailsRuaBarataRibeiro,
    }

    fetchMocks(fetchMockedResponses.getGeolocationByPlaceId)

    const result = await geolocation.getUserAddressByPlaceId(placeIdRuaBarataRibeiro)
    expect(result).toMatchObject(mappedAddressRuaBarataRibeiro)
  })

  it('getAutocompleteAddressPredictions', async () => {
    fetchMocks(placeAutocompleteRuaBarataRibeiro)

    const predictions = await geolocation.getAutocompleteAddressPredictions()
    expect(predictions).toMatchObject(placeAutocompleteRuaBarataRibeiro.predictions)
  })

  it('mapGooglePlaceToUserAddress', () => {
    const mappedAddress = geolocation.mapGooglePlaceToUserAddress(placeDetailsRuaBarataRibeiro)
    expect(mappedAddress).toMatchObject(mappedAddressRuaBarataRibeiro)
  })

  describe('isAddressValid', () => {
    it('shoud be valid', () => {
      const mappedAddress = geolocation.mapGooglePlaceToUserAddress(placeDetailsRuaBarataRibeiro)
      expect(geolocation.isAddressValid(mappedAddress)).toBe(true)
    })
    it('shoud be invalid', () => {
      const mappedAddress = geolocation.mapGooglePlaceToUserAddress(placeDetailsRuaBarataRibeiro)
      const withoutProvince = { ...mappedAddress, province: null }
      const withoutCity = { ...mappedAddress, city: null }
      const withoutStreet = { ...mappedAddress, street: null }
      expect(geolocation.isAddressValid(withoutProvince)).toBe(false)
      expect(geolocation.isAddressValid(withoutCity)).toBe(false)
      expect(geolocation.isAddressValid(withoutStreet)).toBe(false)
    })
  })
})
