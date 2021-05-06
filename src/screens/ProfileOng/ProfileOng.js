import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import AddressSearchInput, { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import i18n from 'i18n-js'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { ScrollView, View, Image, ImageBackground } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { APP_ROUTES } from 'services/constants'
import Icon from 'components/atoms/Icon'
import { COLORS, ICON_SIZE } from 'services/style'
import { BUTTON_SCHEMES } from '../../components/molecules/Button/styles'
import styles from './styles'
import { AppStoreContext } from 'services/stores'
import { MODE, TYPE, openLink } from 'services/utils'
import { appendAddress, getMapsAddress } from 'services/utils/address'
import handsOng from '../../assets/handsOng.png'
import handsEvent from '../../assets/handsEvent.png'

const ProfileOng = ({ navigation }) => {
  const [mode, setMode] = useState(MODE.VIEW)
  const [selectedAddress, setSelectedAddress] = useState({})
  const [selectedButton, setSelectedButton] = useState(0)
  const profile = navigation.getParam('profile')
  console.log('profile', profile)
  const addressDesc = profile?.address?.address ? `${profile?.address?.address} - ${profile?.address?.neighborhood}, ${profile?.address?.province}` : ''
  const imageSource = { uri: profile?.image_url }

  return useObserver(() => (
    <Container title={i18n.t('profile.title')} backTo={() => navigation.navigate({ routeName: APP_ROUTES.Home })}>
      <View style={styles.container}>
        <ImageBackground source={profile?.type === TYPE.EVENT ? handsEvent : handsOng} style={styles.imageWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={imageSource}
              style={styles.image}
            />
          </View>
          <View style={styles.flexCenter}>
            <Text bold style={styles.headerText}>{profile?.name}</Text>
            <View style={[styles.flexCenter, styles.row]}>
              <Icon
                icon={'map-marker'}
                size={18.3}
                style={{...styles.headerText, color: COLORS.DANGER }}
              />
              <Text style={styles.headerText}>
                {addressDesc}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {/* BUTTONS */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button title="Fotos" scheme={selectedButton === 0 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK} style={{ borderRadius: 0 }} onPress={() => setSelectedButton(0)}/>
          <Button title="Apoiadores" scheme={selectedButton === 1 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK} style={{ borderRadius: 0 }} onPress={() => setSelectedButton(1)}/>
          <Button title="Sobre" scheme={selectedButton === 2 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK}  style={{ borderRadius: 0 }} onPress={() => setSelectedButton(2)}/>
        </View>
        <View style={{ flex: 1 }}>
          {selectedButton === 0 ?
            <ScrollView style={styles.viewData}>
              <View style={styles.imagesWrapper}>
                {profile?.photos ? 
                  <>
                    {profile?.photos?.map(photo => (
                      <Image
                        source={{ uri: photo ? photo : profile?.image_url }}
                        style={[styles.image, { borderRadius: 0, margin: 4 }]}
                      />
                    ))}
                  </>
                : <Text medium>Nenhuma foto disponível</Text>}
              </View>
            </ScrollView>
          : null}
          {selectedButton === 1 ?
            <ScrollView style={styles.viewData}>
              {mode === MODE.VIEW ? 
                <View>
                  <IconCard height={null} hideIconSpacer>
                    <View style={{ padding: 16 }}>
                      <Text bold>Nossos apoiadores</Text>
                    </View>
                  </IconCard>
                  {profile?.supporters ? 
                    <>
                      {profile?.supporters?.map(supporter => <IconCard iconName="account-heart" description={supporter.name}/>)}
                    </>
                    : null
                  }
                </View> : null
              }
            </ScrollView>          : null}
          {selectedButton === 2 ?
            <ScrollView style={styles.viewData}>
              {mode === MODE.VIEW ? 
                <View>
                  <IconCard height={null} hideIconSpacer>
                    <View style={{ padding: 16 }}>
                      <Text bold>{profile?.name}</Text>
                    </View>
                  </IconCard>
                  <IconCard iconName="heart" description={profile?.about}/>
                  <IconCard iconName="clock" description={`${profile?.opening_time} - ${profile?.closing_time}`}/>
                </View> : null
              }
            </ScrollView>
          : null}
        </View>
        {/* ADDRESS */}
        {profile?.address && mode === MODE.EDIT ? 
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
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button title="Doar pessoalmente" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => openLink(encodeURI(`https://maps.google.com/maps?daddr=${getMapsAddress(profile?.address)}`))}/>
            <Button title="Doar online" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => navigation.navigate({ routeName: APP_ROUTES.Home })}/>
          </View>
        : null}
        {/* {mode === MODE.VIEW && isMyProfile ?
          <View>
            <Button title="Editar dados" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.EDIT)}/>
          </View>
        : null} */}
        {mode === MODE.EDIT ?
          <View>
            <Button title="Salvar" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.VIEW)}/>
          </View>
        : null}
      </View>
    </Container>
  ))
}

ProfileOng.navigationOptions = {
  header: null,
}

export default ProfileOng
