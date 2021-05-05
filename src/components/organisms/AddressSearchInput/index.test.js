import React from 'react'
import i18n from 'i18n-js'
import { render, fireEvent, wait } from '@testing-library/react-native'

import { fetchMocks } from 'services/tests/mocks'
import { mapGooglePlaceToUserAddress } from 'services/geolocation'

import placeAutocompleteRuaBarataRibeiro from './testStubs/place-autocomplete--rua-barata-ribeiro-284.json'
import placeDetailsRuaBarataRibeiro from './testStubs/place-details--rua-barata-ribeiro-284.json'
// eslint-disable-next-line max-len
import placeAutocompleteRuaBarataRibeiroWithoutNumber from './testStubs/place-autocomplete--rua-barata-ribeiro-without-number.json'
// eslint-disable-next-line max-len
import placeDetailsRuaBarataRibeiroWithoutNumber from './testStubs/place-details--rua-barata-ribeiro-without-number.json'

import AddressSearchInput from '.'

const placeIdRuaBarataRibeiro = placeDetailsRuaBarataRibeiro.result.place_id

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

const props = {
  handleSelectedAddress: jest.fn(),
  onInputFocus: jest.fn(),
  onPressMyLocation: jest.fn(),
  onPressMyLocationError: jest.fn(),
  onAddressError: jest.fn(),
}

describe('AddressSearchInput', () => {
  afterEach(() => {
    fetch.mockReset()
    props.handleSelectedAddress.mockReset()
    props.onInputFocus.mockReset()
    props.onPressMyLocation.mockReset()
    props.onPressMyLocationError.mockReset()
    props.onAddressError.mockReset()
  })

  it('should render properly', () => {
    const { baseElement } = render(<AddressSearchInput {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  describe('On Render Address Predictions List', () => {
    it('should render predictions when address has more than 3 chars', async () => {
      const { getByLabelText, queryAllByText } = render(<AddressSearchInput {...props} />)

      fetchMocks(placeAutocompleteRuaBarataRibeiro)

      fireEvent.changeText(getByLabelText('input-address'), 'rua barata ribeiro, 284')
      await wait()

      expect(fetch).toBeCalledTimes(1)
      expect(queryAllByText('Rua Barata Ribeiro, 284').length).toBe(5)
    })
    it('should NOT render predictions when address has less than 3 chars', async () => {
      const { getByLabelText, queryAllByText } = render(<AddressSearchInput {...props} />)

      fetchMocks(placeAutocompleteRuaBarataRibeiro)

      fireEvent.changeText(getByLabelText('input-address'), 'ru')
      await wait()

      expect(fetch).toBeCalledTimes(0)
      expect(queryAllByText('Rua Barata Ribeiro, 284').length).toBe(0)
    })
    // eslint-disable-next-line max-len
    it('should render address not found component when getAutocompleteAddressPredictions retrieves empty list', async () => {
      const { getByLabelText, queryAllByText, getByText } = render(<AddressSearchInput {...props} />)

      fetchMocks({ predictions: [], status: 'ZERO_RESULTS' })

      fireEvent.changeText(getByLabelText('input-address'), 'rua 999999999999')
      await wait()

      expect(fetch).toBeCalledTimes(1)
      expect(queryAllByText('Rua Barata Ribeiro, 284').length).toBe(0)
      expect(getByText(i18n.t('addressSearchInput.errors.routeNotFound.title'))).toBeTruthy()
      expect(getByText(i18n.t('addressSearchInput.errors.routeNotFound.subtitle'))).toBeTruthy()
      expect(getByText(i18n.t('addressSearchInput.errors.routeNotFound.callToAction'))).toBeTruthy()
    })
    it('should render address not found component when handleMyUserLocation fails', async () => {
      const { getByLabelText, queryAllByText } = render(<AddressSearchInput {...props} />)

      fetchMocks({ predictions: [], status: 'ZERO_RESULTS' })

      fireEvent.changeText(getByLabelText('input-address'), 'rua 999999999999')
      await wait()

      expect(fetch).toBeCalledTimes(1)
      expect(queryAllByText('Rua Barata Ribeiro, 284').length).toBe(0)
    })
  })

  describe('On Select Address', () => {
    // eslint-disable-next-line max-len
    it('should run handleSelectedAddress when user set input address by pressing AddressCard of the adress prediction list', async () => {
      const { getByLabelText } = render(<AddressSearchInput {...props} />)

      const mappedAddressRuaBarataRibeiro = mapGooglePlaceToUserAddress(placeDetailsRuaBarataRibeiro)

      const fetchMockedResponses = {
        getAutocompleteAddressPredictions: placeAutocompleteRuaBarataRibeiro,
        getGeolocationByPlaceId: placeDetailsRuaBarataRibeiro,
      }

      fetchMocks(fetchMockedResponses.getAutocompleteAddressPredictions, fetchMockedResponses.getGeolocationByPlaceId)

      fireEvent.changeText(getByLabelText('input-address'), 'rua barata ribeiro, 284')
      await wait()

      const firstAddressCardPrediction = getByLabelText(
        'address-card-Rua Barata Ribeiro, 284 Bela Vista, São Paulo - SP, Brasil'
      )
      fireEvent.press(firstAddressCardPrediction)
      await wait()

      expect(props.handleSelectedAddress).toBeCalledTimes(1)
      expect(props.handleSelectedAddress).toBeCalledWith(mappedAddressRuaBarataRibeiro)
    })
    it('should render input error when adress is selected without number adress', async () => {
      const { getByLabelText, getByText } = render(<AddressSearchInput {...props} />)

      const fetchMockedResponses = {
        getAutocompleteAddressPredictions: placeAutocompleteRuaBarataRibeiroWithoutNumber,
        getGeolocationByPlaceId: placeDetailsRuaBarataRibeiroWithoutNumber,
      }

      fetchMocks(fetchMockedResponses.getAutocompleteAddressPredictions, fetchMockedResponses.getGeolocationByPlaceId)

      fireEvent.changeText(getByLabelText('input-address'), 'rua barata ribeiro')
      await wait()

      const firstAddressCardPrediction = getByLabelText(
        'address-card-Rua Barata Ribeiro Bela Vista, São Paulo - SP, Brasil'
      )
      fireEvent.press(firstAddressCardPrediction)
      await wait()

      expect(getByText('Opa, tá faltando o número.')).toBeTruthy()
    })
  })

  describe('On My Location', () => {
    it('should set input address by pressing my location button', async () => {
      const { getByLabelText } = render(<AddressSearchInput {...props} />)

      const mappedAddressRuaBarataRibeiro = mapGooglePlaceToUserAddress(placeDetailsRuaBarataRibeiro)

      const fetchMockedResponses = {
        getGeolocationByCoordinates: { results: [{ place_id: placeIdRuaBarataRibeiro }] },
        getGeolocationByPlaceId: placeDetailsRuaBarataRibeiro,
      }

      fetchMocks(fetchMockedResponses.getGeolocationByCoordinates, fetchMockedResponses.getGeolocationByPlaceId)

      fireEvent.press(getByLabelText('my-location-button'))
      await wait()

      expect(props.handleSelectedAddress).toBeCalledTimes(1)
      expect(props.handleSelectedAddress).toBeCalledWith(mappedAddressRuaBarataRibeiro)
      expect(props.onPressMyLocation).toBeCalledTimes(1)
    })
    it('should set input address by pressing my location button inside address not found component', async () => {
      const { getByLabelText } = render(<AddressSearchInput {...props} />)

      fetchMocks({ predictions: [], status: 'ZERO_RESULTS' })

      fireEvent.changeText(getByLabelText('input-address'), 'rua 999999999999')
      await wait()
      fireEvent.press(getByLabelText('my-location-link'))
      await wait()

      expect(props.onAddressError).toBeCalledWith({
        callToAction: 'use a localização no seu celular',
        subtitle: 'busque pelo nome da rua ou',
        title: 'Ops! Não foi possível encontrar o endereço',
      })
      expect(props.onPressMyLocationError).toBeCalledTimes(1)
    })
  })
})
