import React, { useContext } from 'react'
import { useObserver } from 'mobx-react-lite'
import { NavigationEvents } from 'react-navigation'
import { AppStoreContext } from 'services/stores'
import { COLORS } from 'services/style'
import { APP_ROUTES } from 'services/constants'

import Container from 'components/organisms/Container'

const Auth = ({ navigation }) => {
  const appStore = useContext(AppStoreContext)

  const redirectUser = () => {
    if (appStore.isReady) {
      let routeName
      if (!appStore.isUserLogged) {
        routeName = APP_ROUTES.Login
      } else {
        routeName = APP_ROUTES.Main
      }
      navigation.navigate(routeName)
    }
  }

  return useObserver(() => (
    <Container style={{ backgrounColor: COLORS.NIGHT_RIDER }}>
      <NavigationEvents onWillFocus={redirectUser} />
    </Container>
  ))
}

export default Auth
