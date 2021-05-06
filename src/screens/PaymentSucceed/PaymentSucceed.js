import imageSource from '../../assets/check.png'
import Container from 'components/organisms/Container'
import UserFeedbackMessage from 'components/organisms/UserFeedbackMessage'
import React from 'react'
import { APP_ROUTES } from 'services/constants'

const PaymentSucceed = ({ navigation }) => (
  <Container>
    <UserFeedbackMessage
      title={'Parabéns!!'}
      paragraph={'Muito obrigado! Você fez do mundo um lugar um pouquinho melhor!!'}
      submitTitle={'Voltar para Home!'}
      onSubmit={() => navigation.navigate({ routeName: APP_ROUTES.Home })}
      imageSource={imageSource}
    />
  </Container>
)

PaymentSucceed.navigationOptions = {
  header: null,
}

export default PaymentSucceed
