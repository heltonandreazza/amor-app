import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import AddressSearchInput, { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import i18n from 'i18n-js'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { APP_ROUTES } from 'services/constants'
import { COLORS } from 'services/style'
import { BUTTON_SCHEMES } from '../../components/molecules/Button/styles'
import styles from './styles'
import { AppStoreContext } from 'services/stores'
import { MODE, openLink } from 'services/utils'
import { appendAddress, getMapsAddress } from 'services/utils/address'

const DATA = [{ id: 1, value: 'item data value 1' }, { id: 2, value: 'zuera né' }, { id: 2, value: 'zuera a' }, { id: 2, value: 'zuera b' }]
const ProfilePerson = ({ navigation }) => {
  const [mode, setMode] = useState(MODE.VIEW)
  const [selectedAddress, setSelectedAddress] = useState({})
  const user = navigation.getParam('profile')

  const adressDesc = user?.address?.address ? `${user?.address?.address} - ${user?.address?.neighbordhood}, ${user?.address?.province}` : ''

  return useObserver(() => (
    <Container title={i18n.t('profile.title')}>
      <View style={styles.container}>
        {user?.about && mode === MODE.VIEW ? 
          <View>
            <IconCard
              iconColor={COLORS.PRIMARY}
              imageSource={{ uri: user?.photos ? user.photos[0] : 'https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png' }}
              description={<View><Text bold>{`${user.name}\n`}</Text><Text style={{ fontSize: 12 }}>{adressDesc}</Text></View>}
              onPress={() => navigation.navigate({ routeName: APP_ROUTES.Recipe, params: { id: 1 } })}
              descriptionStyle={{ paddingVertical: 8 }} 
              styleImage={{ borderRadius: 36 }}
              styleImageWrapper={{ borderRadius: 36 }}
              textColor={COLORS.NIGHT_RIDER}
              height={null}
            />   
          </View>
        : null}
        {/* ABOUT */}
        {user?.about && mode === MODE.VIEW ? 
          <View>
            <IconCard height={null} hideIconSpacer>
              <View style={{ padding: 16 }}>
                <Text bold>Sobre</Text>
                <Text medium>{user?.about}</Text>
              </View>
            </IconCard>
          </View> : null
        }
        {user?.needs && mode === MODE.VIEW ? 
          <View>
            <IconCard height={null} hideIconSpacer>
              <View style={{ padding: 16 }}>
                <Text bold>Necessidades</Text>
                <Text medium>{user?.needs}</Text>
              </View>
            </IconCard>
          </View> : null
        }
        {/* MAP */}
        {user?.address && mode === MODE.VIEW ? 
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: user?.address?.latitude,
              longitude: user?.address?.longitude,
              latitudeDelta: 0.0180,
              longitudeDelta: 0.0090,
            }}
            showsUserLocation
            showsCompass
            showsMyLocationButton
          >
            <Marker 
              coordinate={{
                latitude: user?.address?.latitude,
                longitude: user?.address?.longitude,
              }}
            />
          </MapView>
        : null}
        {/* ADDRESS */}
        {user?.address && mode === MODE.EDIT ? 
          <View>
            <AddressSearchInput
              handleSelectedAddress={adressObject => {
                setSelectedAddress(adressObject)
              }}
              defaultAddress={getAddressInputTextValue(selectedAddress)}
            />
          </View>
          : null
        }
        {/* ACTIONS */}
        <View style={{ marginTop: 8 }} />
        {mode === MODE.VIEW ?
          <View>
            <Button title="Buscar ONGs/Eventos" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => navigation.navigate({ routeName: APP_ROUTES.Home })}/>
          </View>
        : null}
        {mode === MODE.VIEW ?
          <View>
            <Button title="Doar pessoalmente" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => openLink(encodeURI(`https://maps.google.com/maps?daddr=${getMapsAddress(user?.address)}`))}/>
          </View>
        : null}
        {mode === MODE.VIEW ?
          <View>
            <Button title="Editar dados" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.EDIT)}/>
          </View>
        : null}
        {mode === MODE.EDIT ?
          <View>
            <Button title="Salvar" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.VIEW)}/>
          </View>
        : null}
      </View>
    </Container>
  ))
}

ProfilePerson.navigationOptions = {
  header: null,
}

export default ProfilePerson
