import Icon from 'components/atoms/Icon'
import Loading from 'components/atoms/Loading'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import React, { useContext, useEffect, useState } from 'react'
import { LogBox, ScrollView, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { searchOnMyLocation } from 'services/client'
import { APP_ROUTES, MODE, USER_PROFILE } from 'services/constants'
import { AppStoreContext } from 'services/stores'
import { COLORS, ICON_SIZE } from 'services/style'
import eventPin from '../../assets/heartpin.webp'
import homelessPin from '../../assets/homelessPin.png'
import ongPin from '../../assets/ongPin.png'
import welcome1 from '../../assets/welcome1.png'
import styles from './styles'

const decimalDegreeKm = 1/111 // 1 lat/long degree === 111 km
const getDegreesByKm = (km) => km * decimalDegreeKm
const getTopRighLatLong = ({ latitude, longitude }, km) => ({
  lat: latitude + getDegreesByKm(km),
  long: longitude + getDegreesByKm(km)
})
const getBottomLeftLatLong = ({ latitude, longitude }, km) => ({
  lat: latitude - getDegreesByKm(km),
  long: longitude + getDegreesByKm(km)
})
const getBottomRighLatLong = ({ latitude, longitude }, km) => ({
  lat: latitude - getDegreesByKm(km),
  long: longitude - getDegreesByKm(km)
})
const getTopLeftLatLong = ({ latitude, longitude }, km) => ({
  lat: latitude + getDegreesByKm(km),
  long: longitude - getDegreesByKm(km)
})

LogBox.ignoreAllLogs(true)
const searchOnMyLocationData = {
	points: [{
    profile: 'ONG',
    "id": 4,
    "phone": "11965324578",
    "name": "Ong do bem",
    "document": "89716291000122",
    "about": "Ong do bem foi criada para ajudar a todos os moradores de rua.",
    "openingTime": "08:30",
    "closingTime": "05:35",
    "photos": [],
    "address": {
      "longitude": -46.6536076,
      "latitude": -23.5564118,
      "zip": "01313-001",
      "neighborhood": "Bela Vista",
      "city": "São Paulo",
      "province": "SP",
      "number": "350",
      "street": "Rua Barata Ribeiro",
      "country": "BR"
    },
  }, {
    profile: 'EVENT',
    ongId: 4,
      "id": 24,
      "name": "Evento do bem",
      "pageProfileLink": "asd.com",
      "about": "Evento feito para ajudar moradores de rua de Bela Vista",
      "startDate": "0001-01-01T00:00:00",
      "endDate": "0001-01-01T00:00:00",
      "photos": [],
      "eventAddress": {
        "longitude": -46.6546302,
        "latitude": -23.5568048,
        "zip": "01308-000",
        "neighborhood": "Bela Vista",
        "city": "São Paulo",
        "province": "SP",
        "number": "460",
        "street": "Rua Barata Ribeiro",
        "country": "BR"
      }
  }, {
    "id": 14,
    "name": "Andrea santos",
    "about": "Andrea tem 34 anos e precisa de apoio",
    "needs": "Roupa, comida",
    "address": {
      "longitude": -46.6554224,
      "latitude": -23.556877,
      "zip": "01409-001",
      "neighborhood": "Jardim Paulista",
      "city": "São Paulo",
      "province": "SP",
      "number": "337",
      "street": "Rua Peixoto Gomide",
      "country": "BR"
    },
    "photos": [],
    profile: 'HOMELESS'
  },
  ],
}

const TYPES_IMAGES_PIN = {
  [USER_PROFILE.HOMELESS]: homelessPin,
  [USER_PROFILE.ONG]: ongPin,
  [USER_PROFILE.EVENT]: eventPin,
}

const getImageByType = profile => TYPES_IMAGES_PIN[profile] || null

const getMarkerDataById = (id, points) => points.find(item => item.id == id)

const mapMarkers = markers =>
  markers.map(item => {
    const address = item?.eventAddress ? item?.eventAddress : item?.address
    return {
    ...item,
    key: `${item?.id}:${item?.type}`,
    coordinate: { latitude: address?.latitude ?? 0, longitude: address?.longitude ?? 0 },
    title: item?.name,
    description: item?.about,
    image: getImageByType(item?.type),
    }
  })

const filterOngsEventsMarkers = markers => markers.filter(item => [USER_PROFILE.EVENT, USER_PROFILE.ONG].includes(item.type))

const Home = ({ navigation }) => {
  const appStore = useContext(AppStoreContext)
  const [permission, askPermission, getPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = useState(null);
  const [iconCards, setIconCards] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [markers, setMarkers] = useState([])
  const [points, setPoints] = useState([])
  const onRegionChange = (region) => {
    setCurrentRegion({ region })
  }

  const setCurrentLocation = (latitude, longitude) => {
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0180,
      longitudeDelta: 0.0090,
    })
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({})
    console.log('location', location)
    return location
  }

  async function loadInitialData() {
    try {
      setIsPageLoading(true)
      const location = await getCurrentLocation()
      const params = [
        getTopRighLatLong(location?.coords, 1),
        getBottomLeftLatLong(location?.coords, 1),
        getBottomRighLatLong(location?.coords, 1),
        getTopLeftLatLong(location?.coords, 1),
      ]
      const response = await searchOnMyLocation(params)
      console.log('response', response)
      console.log('mapMarkers(response)', mapMarkers(response))
      console.log('filterOngsEventsMarkers(response)', filterOngsEventsMarkers(response))
      setPoints(response.map(point => ({...point, supporters: point?.supporters ? ['André Santos', 'Maria Souza', ...point?.supporters] : null})))
      setMarkers(mapMarkers(response))
      setIconCards(filterOngsEventsMarkers(response))
      setCurrentLocation(location?.coords?.latitude, location?.coords?.longitude)
    } catch(e) {
      console.log(e)
      setIsPageLoading(false)
    } finally {
      setIsPageLoading(false)
    }
  }

  useEffect(() => {
    loadInitialData()
    // (async () => {
    //   const location = await getCurrentLocation()
    //   setMarkers(mapMarkers(searchOnMyLocationData.points))
    //   setIconCards(filterOngsEventsMarkers(searchOnMyLocationData.points))
    //   setCurrentLocation(location?.coords?.latitude, location?.coords?.longitude)
    //   // const extra = [
    //   //   {
    //   //     address: getTopRighLatLong(location?.coords, 0.1),
    //   //   },
    //   //   {
    //   //     address: getBottomRighLatLong(location?.coords, 0.1),
    //   //   },
    //   //   {
    //   //     address: getBottomLeftLatLong(location?.coords, 0.1),
    //   //   },
    //   //   {
    //   //     address: getTopLeftLatLong(location?.coords, 0.1),
    //   //   },
    //   // ]
    //   // console.log('extra', extra)
    //   // setMarkers(mapMarkers([...searchOnMyLocationData.points, ...extra]))
    // })()
  }, [])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location, null, 2);
  }

  return (
    <View style={styles.container}>
      {isPageLoading ? <Loading testID="container-loader" accessibilityLabel="container-loader" fullScreen /> : null}
      <MapView 
        style={styles.map}
        region={currentRegion}
        onRegionChange={onRegionChange} 
        showsUserLocation
        showsCompass
        showsMyLocationButton
        onPress={() => setSelectedMarker(null)}
      >
        {markers.map(item => {
          if (!item?.coordinate) return
          return (
            <Marker 
              key={item?.key}
              identifier={item?.key}
              coordinate={item?.coordinate}
              title={item?.title}
              description={`${item?.description}. ${item?.openingTime ? `${item?.openingTime} - ${item?.closingTime}` : ''} `}
              image={item?.image}
              onPress={e => {
                const markerId = e?.nativeEvent?.id?.length ? e?.nativeEvent?.id.split(':')[0] : e?.nativeEvent?.id
                const foundMarker = getMarkerDataById(markerId, points)
                if (foundMarker) setSelectedMarker(foundMarker)
              }}
            />
          )
        })}
      </MapView>
      <Button
        round
        containerStyle={{ position: 'absolute', top: 42, right: 12 }}
        onPress={async () => {
          try {
            setIsLoading(true)
            const location = await getCurrentLocation()
            setCurrentLocation(location?.coords?.latitude, location?.coords?.longitude)
          } finally {
            setIsLoading(false)
          }
        }}
        loading={isLoading}
      >
        <Icon icon="crosshairs-gps" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
      </Button>
      <Button
        round
        containerStyle={{ position: 'absolute', top: 300, right: 12 }}
        onPress={async () => {
          try {
            setIsLoading(true)
            const location = await getCurrentLocation()
            setCurrentLocation(location?.coords?.latitude, location?.coords?.longitude)
            const params = [
              getTopRighLatLong(location?.coords, 1),
              getBottomLeftLatLong(location?.coords, 1),
              getBottomRighLatLong(location?.coords, 1),
              getTopLeftLatLong(location?.coords, 1),
            ]
            console.log('params', params)
            const response = await searchOnMyLocation(params)
            console.log('response', response)
            setPoints(response.map(point => ({...point, supporters: point?.supporters ? ['André Santos', 'Maria Souza', ...point?.supporters] : null})))
            setMarkers(mapMarkers(response))
            setIconCards(filterOngsEventsMarkers(response))
          } finally {
            setIsLoading(false)
          }
        }}
        loading={isLoading}
      >
        <Icon icon="map-search" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
      </Button>
      {appStore?.user?.profile == USER_PROFILE.ONG ?
        <Button
          round
          containerStyle={{ position: 'absolute', top: 240, right: 12 }}
          loading={isLoading}
          onPress={() => {
            navigation.navigate({ 
              routeName: APP_ROUTES.ProfileOng,
              params: { profile: {}, mode: MODE.EDIT, profileType: USER_PROFILE.EVENT }
            })
          }}
        >
          <Icon icon="map-marker-plus" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
        </Button>
      : null}
      <Button
        round
        containerStyle={{ position: 'absolute', top: 360, right: 12 }}
        onPress={() => {
          navigation.navigate({ routeName: APP_ROUTES.ProfilePerson, params: { profile: {}, mode: MODE.EDIT, profileType: USER_PROFILE.HOMELESS } })
        }}
        loading={isLoading}
      >
        <Icon icon="account-plus" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
      </Button>
      <Button
        disabled={!selectedMarker}
        title={"Ver mais"}
        containerStyle={{ position: 'absolute', top: 360, left: 12 }}
        onPress={() => {
          let nextRoute = APP_ROUTES.Home
          let nextParams = { profile: selectedMarker }
          if (selectedMarker.type === USER_PROFILE.HOMELESS) {
            nextRoute = APP_ROUTES.ProfilePerson
            nextParams = {...nextParams}
          }
          if (selectedMarker.type === USER_PROFILE.ONG) {
            nextRoute = APP_ROUTES.ProfileOng
            nextParams = {...nextParams, mode: MODE.VEIW, profileType: USER_PROFILE.ONG }
          }
          if (selectedMarker.type === USER_PROFILE.EVENT) {
            nextRoute = APP_ROUTES.ProfileOng
            nextParams = {...nextParams, mode: MODE.VIEW, profileType: USER_PROFILE.EVENT }
          }
          navigation.navigate({ routeName: nextRoute, params: nextParams })
        }}
        loading={isLoading}
      />
      {selectedMarker && selectedMarker.edited && <Button
        title={"Editar"}
        containerStyle={{ position: 'absolute', top: 300, left: 12 }}
        onPress={() => navigation.navigate({ routeName: APP_ROUTES.ProfileOng, params: { profile: selectedMarker, mode: MODE.EDIT, profileType: USER_PROFILE.EVENT } })}
        loading={isLoading}
      />
      }
      <ScrollView>
        {iconCards.map(item => (
          <IconCard
            iconColor={COLORS.PRIMARY}
            imageSource={item?.photos?.length ? { uri: `data:image/jpeg;base64,${item?.photos[0]}` } : welcome1 }
            description={`${item?.name} \n\n${item?.about}\n\n${item?.startDate ? `${new Date(item?.startDate).toLocaleDateString('PT-BR')} - ${new Date(item?.endDate).toLocaleDateString('PT-BR')}` : `${item?.openingTime} - ${item?.closingTime}`}`}
            rightIconName={'chevron-right'}
            showRightIconNameSpacer
            onPress={() => navigation.navigate({ routeName: APP_ROUTES.ProfileOng, params: { profile: item, mode: MODE.VEIW, profileType: item.type } })}
            descriptionStyle={{ paddingVertical: 8 }} 
            textColor={COLORS.NIGHT_RIDER}
            height={null}
          />   
        ))}
      </ScrollView>
    </View>
  )
}

Home.navigationOptions = {
  header: null,
}

export default Home
