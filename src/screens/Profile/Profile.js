import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import { getAddressInputTextValue } from 'components/organisms/AddressSearchInput'
import Container from 'components/organisms/Container'
import i18n from 'i18n-js'
import { useObserver } from 'mobx-react-lite'
import React, { useContext, useState, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { fetchOng } from 'services/client'
import { APP_ROUTES, MODE, USER_PROFILE } from 'services/constants'
import { AppStoreContext } from 'services/stores'
import { COLORS } from 'services/style'
import { BUTTON_SCHEMES } from '../../components/molecules/Button/styles'
import styles from './styles'

const SHOW_FIELDS = [
  { key: 'name', label: 'Nome'},
  { key: 'email', label: 'Email'},
  { key: 'phone', label: 'Telefone'},
]

const Profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [ongData, setOngData] = useState(false)
  const appStore = useContext(AppStoreContext)
  const user = appStore?.user ?? {}

  const logout = () => {
    appStore.logout()
    navigation.navigate(APP_ROUTES.Auth)
  }

  async function fetchOngData() {
    setIsLoading(true)
    try {
      const ongData = await fetchOng()
      if(appStore.user) {
        appStore.user.setInfo(ongData)
      } else {
        appStore.setUser(ongData)
      }
      setOngData(ongData)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useLayoutEffect(() => {
    if (user?.profile === USER_PROFILE.ONG) {
      fetchOngData()
    }
  }, [])

  const adressDesc = getAddressInputTextValue(user?.address)
  
  return useObserver(() => (
    <Container title={i18n.t('profile.title')} isLoading={isLoading}>
      <View style={styles.container}>
        <View>
          <IconCard
            iconColor={COLORS.PRIMARY}
            imageSource={{ uri: user?.photos && `data:image/jpeg;base64,${user?.photos[0]}` }}
            description={<View><Text bold>{`${user.name}\n`}</Text><Text style={{ fontSize: 12 }}>{adressDesc}</Text></View>}
            descriptionStyle={{ paddingVertical: 8 }} 
            styleImage={{ borderRadius: 36 }}
            styleImageWrapper={{ borderRadius: 36 }}
            textColor={COLORS.NIGHT_RIDER}
            height={null}
          />   
        </View>
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
        {/* ACTIONS */}
        <View style={{ marginTop: 8 }} />
        {user?.profile === USER_PROFILE.ONG ?
          <View>
            <Button
              title="Editar minha ONG"
              style={{ marginVertical: 8, marginHorizontal: 8 }}
              onPress={() => navigation.navigate({
                routeName: APP_ROUTES.ProfileOng,
                params: { profile: ongData, mode: MODE.EDIT, profileType: USER_PROFILE.ONG }
              })}/>
          </View>
        : null}
        <View>
          <Button scheme={BUTTON_SCHEMES.SECONDARY_LINK} title="Sair" style={{ marginVertical: 8, marginHorizontal: 8 }} onPress={logout}/>
        </View>
      </View>
    </Container>
  ))
}

Profile.navigationOptions = {
  header: null,
}

export default Profile
