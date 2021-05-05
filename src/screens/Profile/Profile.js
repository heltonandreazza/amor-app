import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import AddressSearchInput, { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import i18n from 'i18n-js'
import { useObserver } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
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

const SHOW_FIELDS = [
  { key: 'name', label: 'Nome'},
  { key: 'email', label: 'Email'},
  { key: 'document', label: 'CPF/CNPJ'},
  { key: 'phone', label: 'Telefone'},
]

const Profile = ({ navigation }) => {
  const [mode, setMode] = useState(MODE.VIEW)
  const [selectedAddress, setSelectedAddress] = useState({})
  const appStore = useContext(AppStoreContext)
  const user = {
    token: 'token',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userId: '123',
    email: 'helton.prg@gmail.com',
    name: 'Helton Andreazza',
    about: 'about',
    needs: 'needs',
    address: {
      latitude: -26.828862,
      longitude: -49.282108,
      address: 'Rua Barata Ribeiro',
      neighborhood: 'Bela Vista',
      zipcode: '01308000',
      city: 'Sao Paulo',
      province: 'SP',
    },
    photos: ['https://i1.wp.com/terracoeconomico.com.br/wp-content/uploads/2019/01/default-user-image.png'],
    document: '07722584965',
    phone: '11976348417',
  }
  // const user = appStore?.user

  const logout = () => {
    appStore.logout(navigation)
    navigation.navigate(APP_ROUTES.Auth)
  }

  const adressDesc = user?.address?.address ? `${user?.address?.address} - ${user?.address?.neighborhood}, ${user?.address?.province}` : ''

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
        {
          SHOW_FIELDS.map(field => {
            const value = user[field.key]
            return (
              <View>
                <IconCard height={null} hideIconSpacer>
                  <View style={{ padding: 16 }}>
                    <Text bold>{field.label}</Text>
                    <Text medium>{value}</Text>
                  </View>
                </IconCard>
              </View>
            )
          })
        }
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
            <Button title="Editar dados" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.EDIT)}/>
          </View>
        : null}
        {mode === MODE.EDIT ?
          <View>
            <Button title="Salvar" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.VIEW)}/>
          </View>
        : null}
        {!user?.type ?
          <View>
            <Button scheme={BUTTON_SCHEMES.SECONDARY_LINK} title="Sair" style={{ marginVertical: 8, marginHorizontal: 8 }} onPress={logout}/>
          </View>
        : null}
      </View>
    </Container>
  ))
}

Profile.navigationOptions = {
  header: null,
}

export default Profile
