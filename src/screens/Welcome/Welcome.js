import React from 'react'
import { View } from 'react-native'
import i18n from 'i18n-js'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import Container from 'components/organisms/Container'

import { APP_ROUTES } from 'services/constants'

import styles from './styles'

const Welcome = ({ navigation }) => (
  <Container>
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text medium style={styles.title}>
          {i18n.t('welcome.brandName')}
        </Text>
      </Text>
      {/* <Image style={styles.image} source={deliveryman} /> */}
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={i18n.t('welcome.enter')}
          accessibilityLabel="welcome-enter"
          onPress={() => navigation.navigate({ routeName: APP_ROUTES.Login })}
        />
      </View>
    </View>
  </Container>
)

export default Welcome
