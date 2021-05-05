import React, { useState, useContext, useCallback } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import get from 'lodash/get'
import first from 'lodash/first'
import i18n from 'i18n-js'

import backgroundImage from '../../../assets/images/splash.png'

import { FEEDBACK, APP_ROUTES } from 'services/constants'
import { AppStoreContext, AlertStoreContext } from 'services/stores'
import { COLORS } from 'services/style'
import { signUp, confirmUser, signIn, resendCodeConfirmation, forgotPassword, confirmForgotPassword } from 'services/Auth'
import { fetchProfileById, mutateProfileUserId, fetchMe } from 'services/client'

import Row from 'components/atoms/Row'
import Button from 'components/molecules/Button'
import Input from 'components/molecules/Input'
import PasswordInput from 'components/molecules/PasswordInput'
import Container from 'components/organisms/Container'
import Text from 'components/atoms/Text'
import { BUTTON_SCHEMES } from 'components/molecules/Button/styles'

import { loginMutation } from './mocks'

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
  const [confirmEmailCode, setConfirmEmailCode] = useState('')
  const [isCreateAccount, setIsCreateAccount] = useState(false)
  const [showConfirmAccountContent, setShowConfirmAccountContent] = useState(false)
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cpf, setCpf] = useState('')
  const [fieldsWithError, setFieldsWithError] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [newForgotPassword, setNewForgotPassword] = useState('')
  const [newForgotConfirmPassword, setNewForgotConfirmPassword] = useState('')
  const [confirmForgotPasswordEmailCode, setConfirmForgotPasswordEmailCode] = useState('')

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

  const validateFields = (submitCreateAccount = false, isForgotPassword = false) => {
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
    } else if (isForgotPassword) { 
      let passwordsDoesNotMatch = newForgotPassword !== newForgotConfirmPassword
      const invalidCreatePassword = newForgotPassword.length < 6 || !/[0-9]+/g.test(newForgotPassword) || !/[A-Za-z]+/g.test(newForgotPassword)
      const invalidConfirmPassword = newForgotConfirmPassword.length < 6 || !/[0-9]+/g.test(newForgotConfirmPassword) || !/[A-Za-z]+/g.test(newForgotConfirmPassword)

      if (!newForgotPassword) {
        errors = createError(errors, 'newForgotPassword', i18n.t('login.messages.invalidEmptyField'))
      } else if (invalidCreatePassword) {
        errors = createError(errors, 'newForgotPassword', i18n.t('login.messages.invalidPassword'))
      }
      if (!newForgotConfirmPassword) {
        errors = createError(errors, 'newForgotConfirmPassword', i18n.t('login.messages.invalidEmptyField'))
      } else if (invalidConfirmPassword) {
        errors = createError(errors, 'newForgotConfirmPassword', i18n.t('login.messages.invalidPassword'))
      }
      if (!errors.length && passwordsDoesNotMatch) {
        errors = createError(errors, 'newForgotPassword', i18n.t('login.messages.invalidPasswordNotMatch'))
        errors = createError(errors, 'newForgotConfirmPassword', i18n.t('login.messages.invalidPasswordNotMatch'))
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

  const loginUser = async response => {
    console.log('loginUser', response)
    if (response.err) {
      if (["NotAuthorizedException"].includes(response.err.code)) {
        alertStore.setAlert({
          type: FEEDBACK.DANGER,
          message: i18n.t(`login.messages.${response.err.code}`),
        })
      } else {
        alertStore.setAlert({
          type: FEEDBACK.DANGER,
          message: i18n.t('login.messages.loginFailed'),
        })
      }
      setIsLoading(false)
    } else {
      if (response.result) {
        const user = {
          email: email,
          token: get(response, 'result.idToken', ''),
          accessToken: get(response, 'result.accessToken', ''),
          refreshToken: get(response, 'result.refreshToken', ''),
          userId: get(response, 'result.userId', ''),
          sub: password,
        }
        appStore.setUser(user)

        try {
          const profileData = await fetchMe()
          if (profileData.id) {
            await appStore.setProfile(profileData)
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
      console.log('onSubmit')
      try {
        await signIn({ username: email, password: password }, loginUser)
      } catch (e) {
        console.log(`login: ${e}`)
      }
    }
  }

  function handleConfirmAccountError(response) {
    if (["ExpiredCodeException", "CodeMismatchException", "InvalidParameterException"].includes(response.err.code)) {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t(`login.messages.${response.err.code}`),
      })
    } else {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t('somethingWentWrong'),
      })
    }
  }

  const confirmAccount = response => {
    setIsLoading(false)
    if (response.err) {
      handleConfirmAccountError(response)
    } else {
      if (response.result) {
        // mutateProfileUserId(appStore.userName, appStore.user.name)
        alertStore.setAlert({
          type: FEEDBACK.SUCCESS,
          message: i18n.t('login.messages.emailConfirmedWithSuccess'),
        })
        setShowConfirmAccountContent(false)
        setIsCreateAccount(false)
      }
    }
  }

  const onSubmitConfirmCreateAccount = async () => {
    if (!appStore.user.email) return
    setIsLoading(true)
    try {
      confirmUser({ username: appStore.user.email, code: confirmEmailCode}, confirmAccount)
    } catch(err) {
      console.log(err)
    }
  }

  const onSubmitResendConfirmCreateAccount = async () => {
    if (!appStore.user.email) return
    setIsLoading(true)
    try {
      resendCodeConfirmation({ username: appStore.user.email }, response => {
        setIsLoading(false)
        if (response.err) {
          handleConfirmAccountError(response)
        } else {
          if (response.result) {
            alertStore.setAlert({
              type: FEEDBACK.SUCCESS,
              message: i18n.t('login.messages.weveResentCode'),
            })
          }
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  function handleCreateAccountError(response) {
    console.log('ERROR', response.err)
    if (response.err.code === "UsernameExistsException") {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t('login.messages.UsernameExistsException'),
      })
    } else {
      alertStore.setAlert({
        type: FEEDBACK.DANGER,
        message: i18n.t('somethingWentWrong'),
      })
    }
  }

  const createAccount = response => {
    setIsLoading(false)
    if (response.err) {
      handleCreateAccountError(response)
    } else {
      console.log('SUCCESS', get(response, 'result', ''))
      if (response.result) {
        alertStore.setAlert({
          type: FEEDBACK.SUCCESS,
          message: i18n.t('login.messages.accountCreatedWithSuccess'),
        })
        setShowConfirmAccountContent(true)
        const user = {
          email: get(response, 'result.user.username', ''),
          userId: get(response, 'result.userSub', ''),
        }

        appStore.setUser(user)
      }
    }
  }

  const onSubmitCreateAccount = async () => {
    if (validateFields(true)) {
      setIsLoading(true)
      try {
        const normalizedUserName = userName || ''
        appStore.setUserName(normalizedUserName)
        const user = await fetchProfileById(normalizedUserName)
        if (user.err) {
          if (["AlreadyBeingUsed"].includes(user.err.code)) {
            alertStore.setAlert({
              type: FEEDBACK.DANGER,
              message: i18n.t(`login.messages.${user.err.code}`),
            })
          } else {
            alertStore.setAlert({
              type: FEEDBACK.DANGER,
              message: i18n.t('somethingWentWrong'),
            })
          }
          setIsLoading(false)
        } else {
          if (cpf !== user.firstCpf) {
            let errors = []
            errors = createError(errors, 'cpf', i18n.t('login.messages.invalidCpf'))
            setFieldsWithError(errors)
            setIsLoading(false)
          } else {
            signUp({ email: createEmail?.trim(''), password: createPassword?.trim('') }, createAccount)
          }
        }
      } catch(err) {
        console.log(err)
        setIsLoading(false)
      }
    }
  }

  const onSubmitForgotPassword = async () => {
    setIsLoading(true)
    try {
      console.log('onSubmitForgotPassword', forgotEmail)
      forgotPassword({ username: forgotEmail }, response => {
        setIsLoading(false)
        if (response.err) {
          handleCreateAccountError(response)
        } else {
          appStore.setUser({
            email: forgotEmail
          })

          setShowConfirmNewPassword(true)
          setShowForgotPassword(true)

          alertStore.setAlert({
            type: FEEDBACK.SUCCESS,
            message: i18n.t('login.messages.forgotPasswordCreatedWithSuccess'),
          })
        }
      })
    } catch(err) {
      console.log(err)
    }
  }

  const onSubmitConfirmForgotPassword = async () => {
    if (validateFields(false, true)) {
      setIsLoading(true)
      try {
        confirmForgotPassword({ username: appStore.user.email, verificationCode: confirmForgotPasswordEmailCode, newPassword: newForgotPassword }, response => {
          setIsLoading(false)
          console.log(response)
          if (response?.err) {
            handleConfirmAccountError(response)
          } else {
            mutateProfileUserId(appStore.userName, appStore.user.userId)
            alertStore.setAlert({
              type: FEEDBACK.SUCCESS,
              message: i18n.t('login.messages.emailPasswordConfirmedWithSuccess'),
            })
            setShowConfirmNewPassword(false)
            setShowForgotPassword(false)
          }
        })
      } catch(err) {
        console.log(err)
        alertStore.setAlert({
          type: FEEDBACK.DANGER,
          message: i18n.t('somethingWentWrong'),
        })
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
            maxLength={11}
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
        {/* <Row>
          <Button onPress={() => setShowConfirmAccountContent(true)} scheme={BUTTON_SCHEMES.PRIMARY_LINK}>
            <Text medium>
              {`${i18n.t('login.alreadyHaveAccountNotConfirmed')} `}
              <Text medium style={{ color: COLORS.PRIMARY }}>
                {i18n.t('login.clickHere')}
              </Text>
            </Text>
          </Button>
        </Row> */}
      </View>
    )
  }

  function renderForgotPassword() {
    return (
      <View>
        <Row style={styles.row}>
          <Text medium>
            {i18n.t('login.forgotPassword')}
          </Text>
        </Row>
        <Row style={styles.row}>
          <Input
            label={i18n.t('login.email')}
            value={forgotEmail}
            onChangeText={updateState('forgotEmail', setForgotEmail)}
            errorMessage={getErrorMessageByKey('forgotEmail')}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </Row>
        <Row style={styles.row}>
          <Button
            testID="submit-button-create-account"
            title={i18n.t('login.resetPassword')}
            onPress={onSubmitForgotPassword}
          />
        </Row>
        <Row style={styles.row}>
          <Button 
            onPress={() => {
              setShowConfirmNewPassword(false)
              setShowForgotPassword(false)
            }}
            scheme={BUTTON_SCHEMES.PRIMARY_LINK}
          >
            <Text medium style={{ color: COLORS.PRIMARY }}>
              {i18n.t('login.goBack')}
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
        <Row>
          <Button onPress={() => setShowForgotPassword(true)} scheme={BUTTON_SCHEMES.PRIMARY_LINK}>
            <Text medium>
              {`${i18n.t('login.forgotPassword')} `}
              <Text medium style={{ color: COLORS.PRIMARY }}>
                {i18n.t('login.clickHere')}
              </Text>
            </Text>
          </Button>
        </Row>
      </View>
    )
  }

  function renderConfirmNewAccount() {
    return (
      <View>
        <Row style={styles.row}>
          <Text medium>
            {i18n.t('login.confirmCreateAccount')}
          </Text>
        </Row>
        <Row style={styles.row}>
          <Input
            testID="confirm-email-input"
            label={i18n.t('login.confirmEmailCode')}
            value={confirmEmailCode}
            onChangeText={updateState('confirmEmailCode', setConfirmEmailCode)}
            errorMessage={getErrorMessageByKey('confirmEmailCode')}
            autoCapitalize="none"
            accessibilityLabel="confirm-email"
            keyboardType="number-pad"
            maxLength={6}
          />
        </Row>
        <Row style={styles.row}>
          <Button
            testID="submit-button-confirm-account"
            title={i18n.t('login.submitConfirmCreateAccount')}
            onPress={onSubmitConfirmCreateAccount}
          />
        </Row>
        <Row style={styles.row}>
          <Button 
            onPress={onSubmitResendConfirmCreateAccount}
            scheme={BUTTON_SCHEMES.PRIMARY_LINK}
          >
            <Text medium style={{ color: COLORS.PRIMARY }}>
              {i18n.t('login.resendCode')}
            </Text>
          </Button>
        </Row>
        <Row style={styles.row}>
          <Button 
            onPress={() => {
              setShowConfirmAccountContent(false)
              setIsCreateAccount(true)
            }}
            scheme={BUTTON_SCHEMES.PRIMARY_LINK}
          >
            <Text medium style={{ color: COLORS.PRIMARY }}>
              {i18n.t('login.goBack')}
            </Text>
          </Button>
        </Row>
      </View>
    )
  }

  function renderConfirmNewPassword() {
    return (
      <View>
        <Row style={styles.row}>
          <Text medium>
            {i18n.t('login.confirmCreateAccount')}
          </Text>
        </Row>
        <Row style={styles.row}>
          <Input
            label={i18n.t('login.confirmEmailCode')}
            value={confirmForgotPasswordEmailCode}
            onChangeText={updateState('confirmForgotPasswordEmailCode', setConfirmForgotPasswordEmailCode)}
            errorMessage={getErrorMessageByKey('confirmForgotPasswordEmailCode')}
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={6}
          />
        </Row>
        <Row style={styles.row}>
          <PasswordInput
            label={i18n.t('login.password')}
            value={newForgotPassword}
            onChangeText={updateState('newForgotPassword', setNewForgotPassword)}
            errorMessage={getErrorMessageByKey('newForgotPassword')}
          />
        </Row>
        <Row style={styles.row}>
          <PasswordInput
            label={i18n.t('login.confirmPassword')}
            value={newForgotConfirmPassword}
            onChangeText={updateState('newForgotConfirmPassword', setNewForgotConfirmPassword)}
            errorMessage={getErrorMessageByKey('newForgotConfirmPassword')}
          />
        </Row>
        <Row style={styles.row}>
          <Button
            testID="submit-button-confirm-account"
            title={i18n.t('login.submitConfirmCreateAccount')}
            onPress={onSubmitConfirmForgotPassword}
          />
        </Row>
        <Row style={styles.row}>
          <Button 
            onPress={() => {
              setShowConfirmNewPassword(false)
              setShowForgotPassword(true)
            }}
            scheme={BUTTON_SCHEMES.PRIMARY_LINK}
          >
            <Text medium style={{ color: COLORS.PRIMARY }}>
              {i18n.t('login.goBack')}
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
        {!isCreateAccount && !showConfirmAccountContent && !showForgotPassword ? renderLogin() : null}
        {isCreateAccount && !showConfirmAccountContent && !showForgotPassword ? renderCreateAccount() : null}
        {isCreateAccount && showConfirmAccountContent && !showForgotPassword ? renderConfirmNewAccount() : null}
        {!isCreateAccount && !showConfirmAccountContent && showForgotPassword && !showConfirmNewPassword ? renderForgotPassword() : null}
        {!isCreateAccount && !showConfirmAccountContent && showForgotPassword && showConfirmNewPassword ? renderConfirmNewPassword() : null}
      </Container>
    </ImageBackground>
  )
}

export default Login
