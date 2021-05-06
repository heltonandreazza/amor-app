import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import IconCard from 'components/molecules/IconCard'
import Input from 'components/molecules/Input'
import Container from 'components/organisms/Container'
import { useObserver } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { APP_ROUTES } from 'services/constants'
import { AppStoreContext } from 'services/stores'
import { COLORS } from 'services/style'
import { MODE } from 'services/utils'
import handsOng from '../../assets/ongPin.png'
import styles from './styles'

const thereIsEmptyField = (fields = []) => fields.some(value => !value)

const Payment = ({ navigation }) => {
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpMonth, setCardExpMonth] = useState('')
  const [cardExpYear, setCardExpYear] = useState('')
  const [cardCode, setCardCode] = useState('')
  const appStore = useContext(AppStoreContext)

  return useObserver(() => (
    <Container title={'Pagamento'} backTo={() => navigation.goBack()}>
      <View style={styles.container}>
        <View>
          <IconCard
            iconColor={COLORS.PRIMARY}
            imageSource={handsOng}
            description={<View><Text bold>{`Vamos ajudar?\n`}</Text><Text>{'Selecione a forma de pagamento'}</Text></View>}
            onPress={() => navigation.navigate({ routeName: APP_ROUTES.Recipe, params: { id: 1 } })}
            descriptionStyle={{ paddingVertical: 8 }} 
            styleImage={{ borderRadius: 36 }}
            styleImageWrapper={{ borderRadius: 36 }}
            textColor={COLORS.NIGHT_RIDER}
            height={null}
          />   
        </View>
        <View style={{ margin: 8 }}>
          <IconCard iconName="credit-card-marker" iconColor={COLORS.NIGHT_RIDER} rightIconColor={COLORS.SUCCESS} rightIconName={'check'} description="Cartão de crédito"/>
        </View>
        <View style={{ margin: 4 }}>
          <View style={{ margin: 4 }}>
            <Input label='Nome no cartão' value={cardName} onChangeText={value => setCardName(value)} />
          </View>
          <View style={{ margin: 4 }}>
            <Input label='Nro do cartão' value={cardNumber} onChangeText={value => setCardNumber(value)} keyboardType="number-pad" maxLength={16}/>
          </View>
          <View style={{ margin: 4, flexDirection: 'row' }}>
            <Input label='Mês expiração' value={cardExpMonth} onChangeText={value => setCardExpMonth(value)} keyboardType="number-pad" maxLength={2}/>
            <Input label='Ano expiração' value={cardExpYear} onChangeText={value => setCardExpYear(value)} keyboardType="number-pad" maxLength={4}/>
            <Input label='CVV' value={cardCode} onChangeText={value => setCardCode(value)} keyboardType="number-pad" maxLength={3}/>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={{ marginTop: 8 }} />
        <View>
          <Button 
            title="Realizar Pagamento" 
            style={{ marginTop: 8, marginHorizontal: 8 }} 
            onPress={() => navigation.navigate({ routeName: APP_ROUTES.PaymentSucceed })}
            disabled={thereIsEmptyField([cardName, cardNumber, cardExpMonth, cardExpYear, cardCode])}  
          />
        </View>
      </View>
    </Container>
  ))
}

Payment.navigationOptions = {
  header: null,
}

export default Payment
