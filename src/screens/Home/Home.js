import Icon from 'components/atoms/Icon';
import Button from 'components/molecules/Button';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import { COLORS, ICON_SIZE } from 'services/style';
import IconCard from 'components/molecules/IconCard'
import Text from 'components/atoms/Text'
import ElevatedView from 'components/atoms/ElevatedView'
import welcome1 from '../../assets/welcome1.png'
import ongPin from '../../assets/ongPin.png'
import eventPin from '../../assets/eventPin.png'
import homelessPin from '../../assets/homelessPin.png'
import { BUTTON_SCHEMES } from '../../components/molecules/Button/styles';
import styles from './styles'
import { APP_ROUTES } from '../../services/constants';

const searchOnMyLocationData = {
	points: [{
		id: '123',
		type: 'HOMELESS',
		name: 'helton',
		about: 'tem 38 anos é um cara bacana',
		needs: 'comida \nroupas',
    address: {
      latitude: -26.827836,
      longitude: -49.285871,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
	},{
		id: '1234',
		type: 'ONG',
		name: 'ONG do bem',
		about: 'ong para ajudar as pessoas',
		opening_time: '8:30',
		closing_time: '17:30',
    address: {
      latitude: -26.828288,
      longitude: -49.287718,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
    image_url: 'https://portalinteragindo.com/wp-content/uploads/2020/12/ONG-Togo.jpg'
	},{
		id: '12345',
		type: 'EVENT',
		name: 'evento do bem',
		about: 'evento beneficente da rua 9',
		opening_time: '8:30',
		closing_time: '17:30',
    address: {
      latitude: -26.826392,
      longitude: -49.288684,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
    image_url: 'https://direcaocultura.com.br/wp-content/uploads/2017/01/ong-460x290.jpg'
	},{
		id: '123456',
		type: 'HOMELESS',
		name: 'andré',
		about: 'tem 18 anos é um cara legal',
    needs: 'comida \nroupas',
    address: {
      latitude: -26.828862,
      longitude: -49.282108,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
    photos: ['https://phoenixprogramsinc.org/wp-content/uploads/2017/12/homeless-man-1170x628.jpg']
	},{
		id: '1234567',
		type: 'HOMELESS',
		name: 'anderson',
		about: 'tem 28 anos é um cara legal',
    needs: 'comida \nroupas',
    address: {
      latitude: -26.8326891,
      longitude: -49.282126,
      address: 'Rua Emma Klitzke',
      neighborhood: 'Centro',
      zipcode: '89120000',
      city: 'Timbó',
      province: 'SC',
    },
    photos: ['https://phoenixprogramsinc.org/wp-content/uploads/2017/12/homeless-man-1170x628.jpg']
	},{
		id: '12345678',
		type: 'HOMELESS',
		name: 'andrea',
		about: 'tem 31 anos é mae de familia',
    needs: 'comida \nroupas',
    address: {
      latitude: -26.831198,
      longitude: -49.280649,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
	},{
		id: '12345679',
		type: 'ONG',
		name: 'ONG COMUNIDADE',
		about: 'Ajudando a comunidade do bairro',
    needs: 'comida \nroupas',
    address: {
      latitude: -26.828985,
      longitude: -49.279405,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
    image_url: 'https://www.tamarthi.com.br/wp-content/uploads/2019/12/como-abrir-uma-ong.jpg',
    opening_time: '8:30',
		closing_time: '17:30',
	}]
}

const USER_TYPE = {
  HOMELESS: 'HOMELESS',
  ONG: 'ONG',
  EVENT: 'EVENT',
}

const TYPES_IMAGES_PIN = {
  [USER_TYPE.HOMELESS]: homelessPin,
  [USER_TYPE.ONG]: ongPin,
  [USER_TYPE.EVENT]: eventPin,
}

const getImageByType = type => TYPES_IMAGES_PIN[type] || null

const getMarkerDataById = id => searchOnMyLocationData.points.find(item => item.id == id)

const mapMarkers = markers => 
  markers.map(item => ({
    ...item,
    key: item?.id,
    coordinate: { latitude: item?.address?.latitude, longitude: item?.address?.longitude },
    title: item?.name,
    description: item?.about,
    image: getImageByType(item?.type),
  }))

const filterOngsEventsMarkers = markers => markers.filter(item => [USER_TYPE.EVENT, USER_TYPE.ONG].includes(item.type))

const Home = ({ navigation }) => {
  const [permission, askPermission, getPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = useState(null);
  const [iconCards, setIconCards] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [markers, setMarkers] = useState([])
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
    return location
  }

  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation()
      setCurrentLocation(location?.coords?.latitude, location?.coords?.longitude)
      setMarkers(mapMarkers(searchOnMyLocationData.points))
      setIconCards(filterOngsEventsMarkers(searchOnMyLocationData.points))
    })()
  }, [])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location, null, 2);
  }

  return (
    <View style={styles.container}>
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
              description={`${item?.description}. ${item?.opening_time ? `${item?.opening_time} - ${item?.closing_time}` : ''} `}
              image={item?.image}
              onPress={e => {
                const foundMarker = getMarkerDataById(e.nativeEvent.id)
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
          } finally {
            setIsLoading(false)
          }
        }}
        loading={isLoading}
      >
        <Icon icon="map-search" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
      </Button>
      <Button
        round
        containerStyle={{ position: 'absolute', top: 360, right: 12 }}
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
        <Icon icon="account-plus" size={ICON_SIZE} color={COLORS.WHITESMOKE} />
      </Button>
      <Button
        disabled={!selectedMarker}
        title="Ver mais"
        containerStyle={{ position: 'absolute', top: 360, left: 12 }}
        onPress={() => {
          console.log('agora vai', selectedMarker)
          navigation.navigate({ routeName: APP_ROUTES.ProfilePerson, params: { user: selectedMarker } })
        }}
        loading={isLoading}
      />
      <ScrollView>
        {iconCards.map(item => (
          <IconCard
            iconColor={COLORS.PRIMARY}
            imageSource={item?.image_url ? { uri: item?.image_url } : welcome1 }
            description={`${item?.name} \n\n${item?.about}\n\n${item?.opening_time} - ${item?.closing_time}`}
            rightIconName={'chevron-right'}
            showRightIconNameSpacer
            onPress={() => navigation.navigate({ routeName: APP_ROUTES.Recipe, params: { id: 1 } })}
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
