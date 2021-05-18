import { AlertStoreContext } from 'services/stores'
import Icon from 'components/atoms/Icon'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import CommentInput from 'components/molecules/CommentInput'
import IconCard from 'components/molecules/IconCard'
import Input from 'components/molecules/Input'
import AddressSearchInput, { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import * as ImagePicker from 'expo-image-picker'
import i18n from 'i18n-js'
import { useObserver } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { mutateHomeless } from 'services/client'
import { APP_ROUTES, MODE, USER_PROFILE, FEEDBACK } from 'services/constants'
import { COLORS, ICON_SIZE } from 'services/style'
import { openLink } from 'services/utils'
import { getMapsAddress } from 'services/utils/address'
import poorImage from '../../assets/poor.png'
import styles from './styles'

const ProfilePerson = ({ navigation }) => {
  const profile = navigation.getParam('profile')
  const profileType = navigation.getParam('profileType')
  const modePage = navigation.getParam('mode')
  
  const alertStore = useContext(AlertStoreContext)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState(modePage || MODE.VIEW)

  // inputs both
  const [name, setName] = useState(profile?.name || '')
  const [about, setAbout] = useState(profile?.about)
  const [needs, setNeeds] = useState(profile?.needs)
  const [mainPhoto, setMainPhoto] = useState(profile?.photos?.length ? profile?.photos[0] : null)
  const [selectedAddress, setSelectedAddress] = useState(profile?.address || {})
  const [counterNotFound, setCounterNotFound] = useState(profile?.counterNotFound || 0)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })
    
    if (!result.cancelled) {
      setMainPhoto(result?.base64)
    }
  }

  async function submit() {
    try {
      setIsLoading(true)
      let params = { 
        id: profile?.id,
        name: name,
        about: about,
        needs: needs,
        photos: [mainPhoto],
        address: selectedAddress,
        counterNotFound: counterNotFound + 1,
      }
      const response = await mutateHomeless(params)
      
      if(response?.ok) {
        alertStore.setAlert({
          type: FEEDBACK.SUCCESS,
          message: 'Dados alterados com sucesso!',
        })
      } else {
        alertStore.setAlert({
          type: FEEDBACK.DANGER,
          message: 'Ops! Algo deu errado',
        })
      }
    } catch(e) {
      console.log(e)
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: 'Algo deu errado',
      })
    } finally {
      setMode(MODE.VIEW)
      setIsLoading(false)
    }
  }

  const getStatus = (counter) => {
    let desc = 'Está por aí'
    if(counter > 3) desc = 'Nem sempre aparece'
    if(counter > 6) desc = 'Difícil de encontrar'
    return desc
  }
  const addressDesc = getAddressInputTextValue(selectedAddress)

  return useObserver(() => (
    <Container backTo={() => navigation.goBack()} title={`Perfil do ${profileType == USER_PROFILE.HOMELESS ? 'morador' : 'usuário'}`} isLoading={isLoading}>
      <View style={styles.container}>
        <View>
          <IconCard
            iconColor={COLORS.PRIMARY}
            imageSource={mainPhoto ? { uri: `data:image/jpeg;base64,${mainPhoto}`} : poorImage }
            description={(
              <View>
                <Text bold>{`${name}\n`}</Text>
                <Text bold style={{ fontSize: 12, color: counterNotFound > 3 ? COLORS.DANGER : COLORS.SUCCESS }}>
                  <Icon icon={counterNotFound > 3 ? 'thumb-down' : 'thumb-up'} size={10} style={{ color: counterNotFound > 3 ? COLORS.DANGER : COLORS.SUCCESS }}/>
                  {getStatus(counterNotFound)}
                </Text>
                <Text style={{ fontSize: 10 }}>
                  <Icon icon={'map-marker'} size={10} style={{ color: COLORS.DANGER }}/>
                  {addressDesc}
                </Text>
              </View>
            )}
            descriptionStyle={{ paddingVertical: 8 }} 
            styleImage={{ borderRadius: 36 }}
            styleImageWrapper={{ borderRadius: 36 }}
            textColor={COLORS.NIGHT_RIDER}
            height={null}
            onPress={mode == MODE.EDIT ? pickImage : () => {}}
          >
            {mode == MODE.EDIT && <View style={styles.iconButton} >
              <Icon
                icon={'plus'}
                size={ICON_SIZE}
                color={COLORS.PRIMARY}
              />
            </View>}
          </IconCard> 
        </View>
        {/* ABOUT */}
        {mode === MODE.VIEW ? 
          <>
            <View>
              <IconCard height={null} hideIconSpacer>
                <View style={{ padding: 16 }}>
                  <Text bold>Sobre</Text>
                  <Text medium>{about}</Text>
                </View>
              </IconCard>
            </View>
            <View>
              <IconCard height={null} hideIconSpacer>
                <View style={{ padding: 16 }}>
                  <Text bold>Necessidades</Text>
                  <Text medium>{needs}</Text>
                </View>
              </IconCard>
            </View>
          </> : null
        }
        {mode === MODE.EDIT ? 
          <>
            <View style={styles.inputWrapper}>
              <Input
                label={'Nome'}
                value={name}
                onChangeText={value => setName(value)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CommentInput
                label={'Sobre'}
                maxLength={150}
                value={about}
                onChangeText={value => setAbout(value)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <CommentInput
                label={'Necessidades'}
                maxLength={150}
                value={needs}
                onChangeText={value => setNeeds(value)}
              />
            </View>
          </> : null
        }
        {/* MAP */}
        {mode === MODE.VIEW ? 
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: selectedAddress?.latitude,
              longitude: selectedAddress?.longitude,
              latitudeDelta: 0.0180,
              longitudeDelta: 0.0090,
            }}
            showsUserLocation
            showsCompass
            showsMyLocationButton
          >
            <Marker 
              coordinate={{
                latitude: selectedAddress?.latitude,
                longitude: selectedAddress?.longitude,
              }}
            />
          </MapView>
        : null}
        {/* ADDRESS */}
        {mode === MODE.EDIT ? 
          <View>
            <AddressSearchInput
              handleSelectedAddress={adressObject => setSelectedAddress(adressObject)}
              defaultAddress={getAddressInputTextValue(selectedAddress)}
            />
          </View>
          : null
        }
        {/* ACTIONS */}
        <View style={{ marginTop: 8 }} />
        {mode === MODE.VIEW ?
          <>
            <View>
              <Button title="Não encontrei o morador" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={submit}/>
            </View>
            <View>
              <Button title="Doar pessoalmente" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => openLink(encodeURI(`https://maps.google.com/maps?daddr=${getMapsAddress(selectedAddress)}`))}/>
            </View>
            <View>
              <Button title="Editar dados" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => setMode(MODE.EDIT)}/>
            </View>
          </>
        : null}
        {mode === MODE.EDIT ?
          <View>
            <Button title="Salvar" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={submit}/>
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
