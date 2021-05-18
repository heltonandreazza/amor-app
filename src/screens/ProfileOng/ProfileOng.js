import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'components/atoms/Icon'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import CommentInput from 'components/molecules/CommentInput'
import IconCard from 'components/molecules/IconCard'
import Input from 'components/molecules/Input'
import AddressSearchInput, { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import * as ImagePicker from 'expo-image-picker'
import { useObserver } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Image, ImageBackground, ScrollView, View } from 'react-native'
import { fetchOng, mutateEvent, mutateOng, mutateEventParticipants } from 'services/client'
import { APP_ROUTES, FEEDBACK, MODE, USER_PROFILE } from 'services/constants'
import { AlertStoreContext, AppStoreContext } from 'services/stores'
import { COLORS, ICON_SIZE } from 'services/style'
import { openLink } from 'services/utils'
import { getMapsAddress } from 'services/utils/address'
import VMasker from 'vanilla-masker'
import handsEvent from '../../assets/handsEvent.png'
import handsOng from '../../assets/handsOng.png'
import { BUTTON_SCHEMES } from '../../components/molecules/Button/styles'
import styles from './styles'

const maskHour = value => value ? VMasker.toPattern(value, '99:99') : value

const getDefaultDate = () => {
  const d = new Date()
  d.setSeconds(1)
  return d
}

const ProfileOng = ({ navigation }) => {
  const alertStore = useContext(AlertStoreContext)
  const appStore = useContext(AppStoreContext)
  const profile = navigation.getParam('profile')
  const profileType = navigation.getParam('profileType')
  const modeParam = navigation.getParam('mode') || MODE.VIEW
  const [mode, setMode] = useState(modeParam)
  const [selectedButton, setSelectedButton] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [modeStartDatePicker, setModeStartDatePicker] = useState('date')
  const [modeEndDatePicker, setModeEndDatePicker] = useState('date')
  const [showStartDatePicker, setshowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  // inputs both
  const [name, setName] = useState(profile?.name)
  // const [phone, setPhone] = useState(profile?.phone)
  const [document, setDocument] = useState(profile?.document)
  const [photos, setPhotos] = useState(profile?.photos ?? [])
  const [supporters, setSupporters] = useState(profile?.supporters)
  console.log('supporters', supporters)
  const [mainPhoto, setMainPhoto] = useState(photos?.length ? photos[0] : null)
  const [about, setAbout] = useState(profile?.about)
  const [selectedAddress, setSelectedAddress] = useState(profile?.address || {})
  // inputs ong
  const [openingTime, setOpeningTime] = useState(profile?.openingTime)
  const [closingTime, setClosingTime] = useState(profile?.closingTime)
  // inputs event
  const [startDate, setStartDate] = useState(profile?.startDate ? new Date(profile?.startDate) : getDefaultDate())
  const [endDate, setEndDate] = useState(profile?.endDate ? new Date(profile?.endDate) : getDefaultDate())
  const [pageProfileLink, setPageProfileLink] = useState(profile?.pageProfileLink || '')
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate
    currentDate.setSeconds(0)
    setshowStartDatePicker(false)
    setStartDate(currentDate)
  }

  const showModeStartDatePicker = (currentMode) => {
    setshowStartDatePicker(true)
    setModeStartDatePicker(currentMode)
  }

  const showStartDatepicker = () => {
    showModeStartDatePicker('date')
  }

  const showStartTimepicker = () => {
    showModeStartDatePicker('time')
  }

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate
    currentDate.setSeconds(0)
    setShowEndDatePicker(false)
    setEndDate(currentDate)
  }

  const showModeEndDatePicker = (currentMode) => {
    setShowEndDatePicker(true)
    setModeEndDatePicker(currentMode)
  }

  const showEndDatepicker = () => {
    showModeEndDatePicker('date')
  }

  const showEndTimepicker = () => {
    showModeEndDatePicker('time')
  }

  const addressDesc = getAddressInputTextValue(selectedAddress)

  const removeLastPhoto = () => {
    photos.splice(photos.length - 1, photos.length)
    if(!photos.length) setMainPhoto(null)
    setPhotos([...photos])
  }

  const pickImage = async (isMainPhoto) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!result.cancelled) {
      if (isMainPhoto) {
        setMainPhoto(result?.base64)
        setPhotos([result?.base64, ...photos])
      } else {
        if(!photos.length) setMainPhoto(result?.base64)
        setPhotos([...photos, result?.base64])
      }
    }
  }

  async function submitParticipate() {
    try {
      setIsLoading(true)
      const response = await mutateEventParticipants({ eventId: profile?.id  })
      alertStore.setAlert({
        type: FEEDBACK.SUCCESS,
        message: 'Parabens por participar!',
      })
      console.log('response', response)
    } catch(e) {
      console.log(e)
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: 'Algo deu errado',
      })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function submit() {
    try {
      setIsLoading(true)
      let params = { 
        id: profile?.id,
        // phone: phone,
        name: name,
        document: document,
        about: about,
        photos: photos,
        address: selectedAddress,
        supporters: supporters,
        pageProfileLink: pageProfileLink,
      }
      if (profileType == USER_PROFILE.EVENT) {
        params = {
          ...params,
          startDate: !startDate?.getSeconds() ? startDate : null,
          endDate: !endDate?.getSeconds() ? endDate : null,
        }
      } else {
        params = {
          ...params,
          openingTime: openingTime,
          closingTime: closingTime,
        }
      }
      let response
      if (profileType == USER_PROFILE.EVENT) {
        response = await mutateEvent(params)
      } else {
        response = await mutateOng(params)
      }
      if(response?.ok) {
        alertStore.setAlert({
          type: FEEDBACK.SUCCESS,
          message: 'Dados alterados com sucesso!',
        })
        const ongData = await fetchOng()
        if(appStore.user) {
          appStore.user.setInfo(ongData)
        } else {
          appStore.setUser(ongData)
        }
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
      setIsLoading(false)
    }
  }

  return useObserver(() => (
    <Container isLoading={isLoading} title={`Perfil ${profileType == USER_PROFILE.EVENT ? 'Evento' : 'Ong'}`} backTo={() => navigation.goBack()}>
      <View style={styles.container}>
        <ImageBackground source={profile?.profile === USER_PROFILE.EVENT ? handsEvent : handsOng} style={styles.imageWrapper}>
          <View style={[styles.imageWrapper, { flexDirection: 'row' }]}>
            <View>
              <Image
                source={{ uri: `data:image/jpeg;base64,${mainPhoto}` }}
                style={styles.image}
              />
            </View>
            <View>
              {mode === MODE.EDIT &&
                <Button round onPress={() => pickImage(true)}>
                  <Icon icon="plus" iconColor={COLORS.WHITE} size={ICON_SIZE}/>
                </Button>
              }
            </View>
          </View>
          <View style={styles.flexCenter}>
            <Text bold style={styles.headerText}>{name}</Text>
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
          {mode === MODE.VIEW && <Button title="Apoiadores" scheme={selectedButton === 1 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK} style={{ borderRadius: 0 }} onPress={() => setSelectedButton(1)}/>}
          <Button title="Sobre" scheme={selectedButton === 2 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK}  style={{ borderRadius: 0 }} onPress={() => setSelectedButton(2)}/>
          {mode === MODE.EDIT && <Button title="Endereço" scheme={selectedButton === 3 ? BUTTON_SCHEMES.PRIMARY :BUTTON_SCHEMES.PRIMARY_LINK}  style={{ borderRadius: 0 }} onPress={() => setSelectedButton(3)}/>}
        </View>
        <View style={{ flex: 1 }}>
          {selectedButton === 0 ?
            <ScrollView style={styles.viewData}>
              <View style={styles.imagesWrapper}>
                {photos ? 
                  <>
                    {photos?.map(photo => (
                      <Image
                        source={{ uri: `data:image/jpeg;base64,${photo}` }}
                        style={[styles.image, { borderRadius: 0, margin: 4 }]}
                      />
                    ))}
                  </>
                : <Text medium>Nenhuma foto disponível</Text>
                }
                {mode === MODE.EDIT &&
                  <View style={{ flex: 1 }}>
                    <Button round onPress={() => pickImage(false)} style={styles.imageAddButton}>
                      <Icon icon="plus" iconColor={COLORS.WHITE} size={ICON_SIZE}/>
                    </Button>
                    <Button round onPress={removeLastPhoto} style={styles.imageAddButton} scheme={BUTTON_SCHEMES.DANGER}>
                      <Icon icon="minus" iconColor={COLORS.WHITE} size={ICON_SIZE}/>
                    </Button>
                  </View>
                }
              </View>
            </ScrollView>
          : null}
          {selectedButton === 1 ?
            <ScrollView style={styles.viewData}>
              <View>
                <IconCard height={null} hideIconSpacer>
                  <View style={{ padding: 16 }}>
                    <Text bold>Nossos apoiadores</Text>
                  </View>
                </IconCard>
                {supporters ? 
                  <>
                    {supporters?.map(supporter => <IconCard iconName="account-heart" description={supporter}/>)}
                  </>
                  : null
                }
              </View>
            </ScrollView> : null}
          {selectedButton === 2 ?
            <ScrollView style={styles.viewData}>
              {mode === MODE.VIEW ? 
                <View>
                  <IconCard height={null} hideIconSpacer>
                    <View style={{ padding: 16 }}>
                      <Text bold>{name}</Text>
                    </View>
                  </IconCard>
                  {/* { profileType == USER_PROFILE.ONG ? <IconCard iconName="phone" description={phone}/> : null} */}
                  <IconCard iconName="heart" description={about}/>
                  { profileType == USER_PROFILE.EVENT && pageProfileLink ? <IconCard iconName="earth" description={pageProfileLink}/> : null}
                  { profileType == USER_PROFILE.ONG && <IconCard iconName="clock" description={`${openingTime} - ${closingTime}`}/>}
                  { profileType == USER_PROFILE.EVENT && <IconCard iconName="clock" description={`${startDate ? startDate.toLocaleString() : ''} - ${endDate ? endDate.toLocaleString() : ''}`}/>}
                </View> : null
              }
              {mode === MODE.EDIT ? 
                <View style={styles.container}>
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
                  {/* <View style={styles.inputWrapper}>
                    { profileType == USER_PROFILE.ONG && 
                      <Input
                        label={'Phone'}
                        value={phone}
                        onChangeText={value => setPhone(value)}
                      />
                    }
                  </View> */}
                  <View style={styles.inputWrapper}>
                    <Input
                      label={'link página do evento'}
                      value={pageProfileLink}
                      onChangeText={value => setPageProfileLink(value)}
                      autoCapitalize="none"
                    />
                  </View>
                  {profileType === USER_PROFILE.ONG &&
                    <View style={[styles.inputWrapper, { flexDirection: 'row' }]}>
                      <Input 
                        label={'Hora abertura'}
                        value={maskHour(openingTime)}
                        onChangeText={value => setOpeningTime(value)}
                        autoCapitalize="none"
                      />
                      <Input
                        label={'Hora fechamento'}
                        value={maskHour(closingTime)}
                        onChangeText={value => setClosingTime(value)}
                        autoCapitalize="none"
                      />
                    </View>
                  }
                  {profileType === USER_PROFILE.EVENT &&
                    <>
                      <View style={[styles.inputWrapper, { flexDirection: 'row' }]}>
                        <Input 
                          label={'Data abertura'}
                          value={startDate ? startDate.toLocaleString() : ''}
                          editable={false}
                          autoCapistalize="none"
                        />
                        <View>
                          <Button onPress={showStartDatepicker} title="Data" />
                        </View>
                        <View>
                          <Button onPress={showStartTimepicker} title="Hora" />
                        </View>
                        {showStartDatePicker && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={startDate}
                            mode={modeStartDatePicker}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeStartDate}
                          />
                        )}
                      </View>
                      <View style={[styles.inputWrapper, { flexDirection: 'row' }]}>
                        <Input 
                          label={'Data fechamento'}
                          value={endDate ? endDate.toLocaleString() : ''}
                          editable={false}
                          autoCapistalize="none"
                        />
                        <View>
                          <Button onPress={showEndDatepicker} title="Data" />
                        </View>
                        <View>
                          <Button onPress={showEndTimepicker} title="Hora" />
                        </View>
                        {showEndDatePicker && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={endDate}
                            mode={modeEndDatePicker}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeEndDate}
                          />
                        )}
                      </View>
                    </>
                  }
                </View> : null
              }
            </ScrollView>
          : null}
          {selectedButton === 3 ?
            <ScrollView style={styles.viewData}>
              {mode === MODE.VIEW ? 
                <View>
                  <IconCard height={null} hideIconSpacer>
                    <View style={{ padding: 16 }}>
                      <Text bold>{name}</Text>
                    </View>
                  </IconCard>
                  {/* <IconCard iconName="phone" description={phone}/> */}
                  <IconCard iconName="heart" description={about}/>
                  <IconCard iconName="clock" description={`${openingTime} - ${closingTime}`}/>
                </View> : null
              }
              {mode === MODE.EDIT ? 
                <View style={styles.container}>
                  {/* ADDRESS */}
                  <AddressSearchInput
                    handleSelectedAddress={adressObject => setSelectedAddress(adressObject)}
                    defaultAddress={getAddressInputTextValue(selectedAddress)}
                  />
                </View> : null
              }
            </ScrollView>
          : null}
        </View>
        {/* ACTIONS */}
        <View style={{ marginTop: 8 }} />
        {mode === MODE.VIEW ?
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button title="Doar pessoalmente" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => openLink(encodeURI(`https://maps.google.com/maps?daddr=${getMapsAddress(selectedAddress)}`))}/>
            {profileType === USER_PROFILE.ONG && <Button title="Doar online" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => navigation.navigate({ routeName: APP_ROUTES.Payment, params: { ongId: profileType == USER_PROFILE.EVENT ? profile?.ongId : profile?.id } })}/>}
            {profileType == USER_PROFILE.EVENT ? <Button title="Participar" style={{ marginTop: 8, marginHorizontal: 8 }} onPress={() => submitParticipate()}/> : null}
          </View>
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

ProfileOng.navigationOptions = {
  header: null,
}

export default ProfileOng
