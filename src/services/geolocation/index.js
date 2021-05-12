/* eslint-disable camelcase */
import * as qs from 'qs'
import find from 'lodash/find'
import * as Location from 'expo-location';

const apiUrl = 'https://maps.googleapis.com/maps/api/'
const apiKey = 'AIzaSyASsC951InqRpnDc_UbUG9-WVjrD4Hnwn8'

export const getCurrentLocation = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  
  let location = await Location.getCurrentPositionAsync({})
  return location
}

export const getAutocompleteAddressPredictions = async (text, addressId) => {
  const params = qs.stringify({
    input: text,
    types: ['address'],
    components: `country:${'br'}`,
    language: 'pt_br',
    key: apiKey,
    sessiontoken: addressId,
  })
  const url = `${apiUrl}place/autocomplete/json?${params}`
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson?.predictions
}

export const getGeolocationByPlaceId = async placeId => {
  const params = qs.stringify({
    place_id: placeId,
    key: apiKey,
  })
  const url = `${apiUrl}place/details/json?${params}`
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson
}

export const getGeolocationByCoordinates = async (latitude, longitude) => {
  const params = qs.stringify({
    latlng: `${latitude},${longitude}`,
    key: apiKey,
  })
  const url = `${apiUrl}geocode/json?${params}`
  console.log('getGeolocationByCoordinates', url)
  const response = await fetch(url)
  console.log('getGeolocationByCoordinates', response)
  const responseJson = await response.json()
  console.log('getGeolocationByCoordinates', responseJson)
  return responseJson
}

export const mapGooglePlaceToUserAddress = place => {
  const addressComponents = place?.result?.address_components ?? []
  const location = place?.result?.geometry?.location ?? {}
  const googleAddress = {
    location,
    postalCode: find(addressComponents, component => component.types.includes('postal_code')) || {},
    country: find(addressComponents, component => component.types.includes('country')) || {},
    province: find(addressComponents, component => component.types.includes('administrative_area_level_1')) || {},
    city: find(addressComponents, component => component.types.includes('administrative_area_level_2')) || {},
    neighborhood: find(addressComponents, component => component.types.includes('sublocality')) || {},
    street: find(addressComponents, component => component.types.includes('route')) || {},
    number: find(addressComponents, component => component.types.includes('street_number')) || {},
    placeId: place?.result?.place_id ?? '',
  }
  const userAddress = {
    latitude: googleAddress.location.lat,
    longitude: googleAddress.location.lng,
    zip: googleAddress.postalCode.long_name,
    neighborhood: googleAddress.neighborhood.long_name,
    city: googleAddress.city.long_name,
    province: googleAddress.province.short_name,
    number: googleAddress.number.long_name,
    street: googleAddress.street.long_name,
    country: googleAddress.country.short_name,
  }
  return userAddress
}

export const getUserAddressByPlaceId = async placeId => {
  const googlePlace = await getGeolocationByPlaceId(placeId)
  return mapGooglePlaceToUserAddress(googlePlace)
}

export const getCurrentPosition = async () => {
  return getCurrentLocation()
}

export const getCurrentUserAddress = async () => {
  const { coords: { latitude, longitude } = {} } = await getCurrentPosition()
  const { results: [firstResult] = [] } = await getGeolocationByCoordinates(latitude, longitude)
  console.log('firstResult', firstResult)
  const userAddress = mapGooglePlaceToUserAddress({ result: firstResult })
  console.log('userAddress', userAddress)
  return userAddress
}

export const isAddressValid = address => {
  const { province, city, street } = address
  return Boolean(province && city && street)
}
