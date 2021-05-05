import React, { useState, useRef } from 'react'
import i18n from 'i18n-js'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import { Image, View, TouchableOpacity } from 'react-native'

import signupAddressErrorImage from '../../../assets/guide.png'

import { textTruncate } from 'services/utils'
import { addressNumberFromText } from 'services/utils/address'
import {
  getCurrentUserAddress,
  getAutocompleteAddressPredictions,
  getUserAddressByPlaceId,
  isAddressValid,
} from 'services/geolocation'

import Row from 'components/atoms/Row'
import Autocomplete from 'components/organisms/Autocomplete'
import MyLocationButton from 'components/molecules/MyLocationButton'
import AddressCard from 'components/molecules/AddressCard'
import Text from 'components/atoms/Text'

import styles from './styles'

export const getAddressInputTextValue = addressObject =>
  `${addressObject?.street ?? ''}${addressObject?.number ? `, ${addressObject?.number}` : ''}`

const AddressSearchInput = ({
  handleSelectedAddress,
  defaultAddress,
  onInputFocus,
  onAddressError,
  onPressMyLocation,
  onPressMyLocationError,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingInput, setIsLoadingInput] = useState(false)
  const [address, setAddress] = useState(defaultAddress)
  const [addressPredictions, setAddressPredictions] = useState([])
  const [addressError, setAddressError] = useState(null)
  const [hasSelectedPlaceWithoutStreetNumber, setHasSelectedPlaceWithoutStreetNumber] = useState(false)
  const inputRef = useRef(null)

  function handleAddressError(errorMessage) {
    setAddressError(errorMessage)
    if (errorMessage) onAddressError(errorMessage)
  }

  function setUserAddress(addressObject) {
    setAddress(getAddressInputTextValue(addressObject))
    setAddressPredictions([])
    handleAddressError(null)
    handleSelectedAddress(addressObject)
  }

  function clearAddressInput() {
    setAddress(null)
    setAddressPredictions([])
    setHasSelectedPlaceWithoutStreetNumber(false)
    handleAddressError(null)
    handleSelectedAddress(null)
  }

  async function handleMyUserLocation() {
    setIsLoading(true)

    try {
      const userAddress = await getCurrentUserAddress()
      setUserAddress(userAddress)
    } catch (e) {
      handleAddressError(i18n.t('addressSearchInput.errors.routeNotFound'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddressPredictions(newAddress) {
    setAddress(newAddress)
    setHasSelectedPlaceWithoutStreetNumber(false)

    if (newAddress.length >= 3) {
      try {
        setIsLoadingInput(true)
        const predictions = await getAutocompleteAddressPredictions(newAddress)
        if (!predictions?.length) {
          handleAddressError(i18n.t('addressSearchInput.errors.routeNotFound'))
        } else {
          setAddressPredictions(predictions)
          handleAddressError(null)
        }
      } catch (e) {
        handleAddressError(i18n.t('addressSearchInput.errors.routeNotFound'))
      } finally {
        setIsLoadingInput(false)
      }
    } else {
      setAddressPredictions([])
      handleAddressError(null)
    }
  }

  async function handleAddressComponents(addressComponent) {
    setIsLoading(true)
    try {
      const userAddress = await getUserAddressByPlaceId(addressComponent.place_id)
      if (!userAddress.number) {
        // eslint-disable-next-line camelcase
        const autocompleteAddressText = addressComponent?.structured_formatting?.main_text ?? ''
        userAddress.number = addressNumberFromText(autocompleteAddressText)
      }

      if (!isAddressValid(userAddress)) {
        handleAddressError(i18n.t('addressSearchInput.errors.routeNotFound'))
      } else {
        setUserAddress(userAddress)
        setHasSelectedPlaceWithoutStreetNumber(!userAddress.number)
      }
    } catch (e) {
      handleAddressError(i18n.t('addressSearchInput.errors.routeNotFound'))
    } finally {
      setIsLoading(false)
    }
  }

  function handleFirstAddressPrediction() {
    const [firstAdressPrediction] = addressPredictions
    if (firstAdressPrediction) handleAddressComponents(firstAdressPrediction)
  }

  const renderNotFound = () => (
    <View style={styles.wrapperNotFound}>
      <Row>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={signupAddressErrorImage} height={64} width={64}/>
        </View>
      </Row>
      <Row style={styles.centered}>
        <Text>{i18n.t('addressSearchInput.errors.routeNotFound.title')}</Text>
      </Row>
      <Row style={styles.centered}>
        <Text style={styles.subtitle}>{i18n.t('addressSearchInput.errors.routeNotFound.subtitle')}</Text>
      </Row>
      <Row style={styles.centered}>
        <TouchableOpacity
          accessibilityLabel="my-location-link"
          onPress={() => {
            handleMyUserLocation()
            onPressMyLocationError()
          }}
        >
          <Text medium style={styles.callToAction}>
            {i18n.t('addressSearchInput.errors.routeNotFound.callToAction')}
          </Text>
        </TouchableOpacity>
      </Row>
    </View>
  )
  const hasPredictions = Boolean(addressPredictions?.length)
  const hasError = Boolean(addressError)

  return (
    <Autocomplete
      isLoading={isLoading}
      onClearPress={() => {
        inputRef.current.focus()
        clearAddressInput()
      }}
      inputProps={{
        inputRef,
        isLoading: isLoadingInput,
        value: address,
        label: i18n.t('addressSearchInput.insertAddress'),
        onFocus: onInputFocus,
        onChangeText: handleAddressPredictions,
        onSubmitEditing: handleFirstAddressPrediction,
        accessibilityLabel: 'input-address',
        errorMessage: hasSelectedPlaceWithoutStreetNumber
          ? i18n.t('addressSearchInput.errors.hasSelectedPlaceWithoutStreetNumber')
          : null,
      }}
      flatListProps={{
        data: !hasError ? addressPredictions : [],
        accessibilityLabel: 'list-address-card',
        renderItem: addressPrediction => (
          <AddressCard
            title={get(addressPrediction, 'item.structured_formatting.main_text')}
            subtitle={textTruncate(`${get(addressPrediction, 'item.structured_formatting.secondary_text')}`, 55)}
            onPress={() => handleAddressComponents(addressPrediction.item)}
          />
        ),
        keyExtractor: (_, index) => index.toString(),
        ListEmptyComponent: hasError ? renderNotFound() : null,
        ListHeaderComponent:
          !hasError && !hasPredictions ? (
            <MyLocationButton
              onPress={() => {
                handleMyUserLocation()
                onPressMyLocation()
              }}
            />
          ) : null,
      }}
    />
  )
}

AddressSearchInput.propTypes = {
  handleSelectedAddress: PropTypes.func.isRequired,
  defaultAddress: PropTypes.string,
  onInputFocus: PropTypes.func,
  onAddressError: PropTypes.func,
  onPressMyLocation: PropTypes.func,
  onPressMyLocationError: PropTypes.func,
}

AddressSearchInput.defaultProps = {
  defaultAddress: '',
  onInputFocus: () => {},
  onAddressError: () => {},
  onPressMyLocation: () => {},
  onPressMyLocationError: () => {},
}

export default AddressSearchInput
