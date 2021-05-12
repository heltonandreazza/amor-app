import Row from 'components/atoms/Row'
import Text from 'components/atoms/Text'
import Button from 'components/molecules/Button'
import { BUTTON_SCHEMES } from 'components/molecules/Button/styles'
import Input from 'components/molecules/Input'
import PasswordInput from 'components/molecules/PasswordInput'
import Container from 'components/organisms/Container'
import i18n from 'i18n-js'
import get from 'lodash/get'
import React, { useContext, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { fetchOng, fetchMe, signIn, signUp } from 'services/client'
import { APP_ROUTES, FEEDBACK } from 'services/constants'
import { AlertStoreContext, AppStoreContext } from 'services/stores'
import { COLORS } from 'services/style'
import backgroundImage from '../../../assets/images/splash.png'
import { USER_PROFILE } from '../../services/constants'

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  clickHere: {
    alignItems: 'center',
    textAlign: 'center',
  },
})

const Login = ({ navigation }) => {
  const appStore = useContext(AppStoreContext)
  const alertStore = useContext(AlertStoreContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createEmail, setCreateEmail] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cpf, setCpf] = useState('')
  const [fieldsWithError, setFieldsWithError] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const updateState = (field, setStateField) => value => {
    setStateField(value)
    setFieldsWithError(fieldsWithError.filter(f => f.key !== field))
  }

  const createError = (errors, key, message) => {
    const hasError = errors.some(field => field.key === key)
    const newFieldsWithError = hasError
      ? [...errors]
      : [
          ...errors,
          {
            key,
            message,
          },
        ]

    return newFieldsWithError
  }

  const validateFields = (submitCreateAccount = false) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isEmptyEmail = false
    let isAValidEmail = false
    let isEmptyPassword = false
    let errors = []

    if (submitCreateAccount) {
      isEmptyEmail = !createEmail
      isAValidEmail = re.test(createEmail.trim())
      let passwordsDoesNotMatch = createPassword !== confirmPassword
      const invalidCreatePassword = createPassword.length < 6 || !/[0-9]+/g.test(createPassword) || !/[A-Za-z]+/g.test(createPassword)
      const invalidConfirmPassword = confirmPassword.length < 6 || !/[0-9]+/g.test(confirmPassword) || !/[A-Za-z]+/g.test(confirmPassword)

      if (!createPassword) {
        errors = createError(errors, 'createPassword', i18n.t('login.messages.invalidEmptyField'))
      } else if (invalidCreatePassword) {
        errors = createError(errors, 'createPassword', i18n.t('login.messages.invalidPassword'))
      }
      if (!confirmPassword) {
        errors = createError(errors, 'confirmPassword', i18n.t('login.messages.invalidEmptyField'))
      } else if (invalidConfirmPassword) {
        errors = createError(errors, 'confirmPassword', i18n.t('login.messages.invalidPassword'))
      }
      if (!errors.length && passwordsDoesNotMatch) {
        errors = createError(errors, 'createPassword', i18n.t('login.messages.invalidPasswordNotMatch'))
        errors = createError(errors, 'confirmPassword', i18n.t('login.messages.invalidPasswordNotMatch'))
      }
      if (isEmptyEmail || !isAValidEmail) {
        errors = createError(errors, 'createEmail', i18n.t('login.messages.invalidEmail'))
      } 
      if (!userName) {
        errors = createError(errors, 'userName', i18n.t('login.messages.invalidEmptyField'))
      } 
    } else {
      isEmptyEmail = !email
      isAValidEmail = re.test(email.trim())
      isEmptyPassword = !password
  
      if (isEmptyEmail || !isAValidEmail) {
        errors = createError(errors, 'email', i18n.t('login.messages.invalidEmail'))
      }
      if (isEmptyPassword) {
        errors = createError(errors, 'password', i18n.t('login.messages.invalidEmptyField'))
      }
    }

    if (errors.length) {
      setFieldsWithError(errors)
      return false
    } else {
      setFieldsWithError([])
    }

    return true
  }

  const getErrorMessageByKey = key => {
    const errorObject = fieldsWithError.filter(f => f.key === key)[0] || {}
    return errorObject.message
  }

  const loginUser = async (response, email, pass) => {
    if (response?.status >= 400) {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t('login.messages.loginFailed'),
      })
      setIsLoading(false)
    } else {
      if (response) {
        const user = {
          email: email || appStore?.user?.email,
          token: get(response, 'token', appStore?.user?.token),
          refreshToken: get(response, 'expiration', appStore?.user?.refreshToken),
          userId: Number(get(response, 'person.id', appStore?.user?.userId)).toString(),
          phone: get(response, 'person.phone', appStore?.user?.phone),
          name: get(response, 'person.name', appStore?.user?.name),
          address: get(response, 'address', appStore?.user?.address),
          sub: pass || appStore?.user?.sub
        }
        if(appStore.user) {
          appStore.user.setInfo(user)
        } else {
          appStore.setUser(user)
        }

        try {
          const userData = await fetchMe()
          await appStore?.user?.setInfo(userData)
          if(userData.profile == USER_PROFILE.ONG) {
            const ongData = await fetchOng()
            appStore.user.setInfo(ongData)
          }

          navigation.navigate(APP_ROUTES.Main)
        } catch (err) {
          console.log(err)
          appStore.logout()
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }
  }

  const onSubmit = async () => {
    if (validateFields()) {
      setIsLoading(true)
      try {
        const response = await signIn({ email, password })
        await loginUser(response, email, password)
      } catch (e) {
        console.log(`login: ${e}`)
      }
    }
  }

  const createAccount = async (response) => {
    setIsLoading(false)
    if (!response.ok) {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t('somethingWentWrong'),
      })
    } else {
      if (response.ok) {
        alertStore.setAlert({
          type: FEEDBACK.SUCCESS,
          message: i18n.t('login.messages.accountCreatedWithSuccess'),
        })
        navigation.navigate(APP_ROUTES.Login)
      }
    }
  }

  const onSubmitCreateAccount = async () => {
    if (validateFields(true)) {
      setIsLoading(true)
      try {
        const params = {
          email: createEmail?.trim(''),
          password: createPassword?.trim(''),
          name: userName,
          phone: phoneNumber,
          document: cpf?.trim(''),
        }
        const response = await signUp(params)
        createAccount(response)
        setIsCreateAccount(false)
      } catch(err) {
        console.log(err)
        alertStore.setAlert({
          type: FEEDBACK.DANGER,
          message: i18n.t('somethingWentWrong'),
        })
        setIsLoading(false)
      }
    }
  }

  function renderCreateAccount() {
    return (
      <View>
        <Row style={styles.row}>
          <Text medium >
            {i18n.t('login.createAccount')}
          </Text>
        </Row>
        <Row style={styles.row}>
          <Input
            testID="create-email-input"
            label={i18n.t('login.email')}
            value={createEmail}
            onChangeText={updateState('createEmail', setCreateEmail)}
            errorMessage={getErrorMessageByKey('createEmail')}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </Row>
        <Row style={styles.row}>
          <PasswordInput
            testID="create-password-input"
            label={i18n.t('login.password')}
            value={createPassword}
            onChangeText={updateState('createPassword', setCreatePassword)}
            errorMessage={getErrorMessageByKey('createPassword')}
          />
        </Row>
        <Row style={styles.row}>
          <PasswordInput
            testID="confirm-password-input"
            label={i18n.t('login.confirmPassword')}
            value={confirmPassword}
            onChangeText={updateState('confirmPassword', setConfirmPassword)}
            errorMessage={getErrorMessageByKey('confirmPassword')}
          />
        </Row>
        <Row style={styles.row}>
          <Input
            testID="userName"
            label={i18n.t('login.userName')}
            value={userName}
            onChangeText={updateState('userName', setUserName)}
            errorMessage={getErrorMessageByKey('userName')}
          />
        </Row>
        <Row style={styles.row}>
          <Input
            testID="cpf"
            label={i18n.t('login.cpf')}
            value={cpf}
            onChangeText={updateState('cpf', setCpf)}
            errorMessage={getErrorMessageByKey('cpf')}
            keyboardType="number-pad"
            maxLength={14}
          />
        </Row>
        <Row style={styles.row}>
          <Input
            testID="phoneNumber"
            label={i18n.t('login.phoneNumber')}
            value={phoneNumber}
            onChangeText={updateState('phoneNumber', setPhoneNumber)}
            errorMessage={getErrorMessageByKey('phoneNumber')}
            keyboardType="number-pad"
            maxLength={12}
          />
        </Row>
        <Row style={styles.row}>
          <Button
            testID="submit-button-create-account"
            title={i18n.t('login.submitCreateAccount')}
            onPress={onSubmitCreateAccount}
          />
        </Row>
        <Row>
          <Button onPress={() => setIsCreateAccount(false)} scheme={BUTTON_SCHEMES.PRIMARY_LINK}>
            <Text medium>
              {`${i18n.t('login.alreadyHaveAccount')} `}
              <Text medium style={{ color: COLORS.PRIMARY }}>
                {i18n.t('login.doLogin')}
              </Text>
            </Text>
          </Button>
        </Row>
      </View>
    )
  }

  function renderLogin() {
    return (
      <View>
        <Row style={styles.row}>
          <Text medium>
            {i18n.t('login.login')}
          </Text>
        </Row>
        <Row style={styles.row}>
          <Input
            testID="email-input"
            label={i18n.t('login.email')}
            value={email}
            onChangeText={updateState('email', setEmail)}
            errorMessage={getErrorMessageByKey('email')}
            autoCapitalize="none"
            accessibilityLabel="email"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </Row>
        <Row style={styles.row}>
          <PasswordInput
            testID="password-input"
            label={i18n.t('login.password')}
            value={password}
            onChangeText={updateState('password', setPassword)}
            errorMessage={getErrorMessageByKey('password')}
            accessibilityLabel="password"
          />
        </Row>
        <Row style={styles.row}>
          <Button testID="submit-button-login" title={i18n.t('login.submitButton')} onPress={onSubmit} />
        </Row>
        <Row>
          <Button onPress={() => setIsCreateAccount(true)} scheme={BUTTON_SCHEMES.PRIMARY_LINK}>
            <Text medium>
              {`${i18n.t('login.dontHaveAccount')} `}
              <Text medium style={{ color: COLORS.PRIMARY }}>
                {i18n.t('login.clickHere')}
              </Text>
            </Text>
          </Button>
        </Row>
      </View>
    )
  }

  return (
    <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%' }}>
      <Container
        isLoading={isLoading}
        containerStyle={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}
      >
        {!isCreateAccount ? renderLogin() : null}
        {isCreateAccount ? renderCreateAccount() : null}
      </Container>
    </ImageBackground>
  )
}

export default Login
