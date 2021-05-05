import i18n from 'i18n-js'

import { API_URL, FEEDBACK } from 'services/constants'
import { appStore } from 'services/stores/AppStore'
import { getAuthenticatedUser } from '../Auth'
import forIn from 'lodash/forIn'
import get from 'lodash/get'
import { alertStore } from 'services/stores/AlertStore'
import { signIn } from 'services/Auth'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const getHeaders = () => {
  const headers = {
    ...DEFAULT_HEADERS,
    Authorization: appStore.user ? appStore.user.token : '',
  }
  return headers
}

export const postData = async (data = {}, path = '', url = API_URL) => {
  const httpCall = () => fetch(`${url}${path}`, {
    headers: getHeaders(),
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data)
  })
  return await makeHttpCall(httpCall)
}

export const fetchData = async (path = '', params = {}, url = API_URL) => {
  let queryParams = ''
  forIn(params, (value, key) => {
    queryParams = `${queryParams}&${key}=${value}`
  })
  queryParams = queryParams ? `?${queryParams.substr(1, queryParams.length)}` : ''
  const httpCall = () => {
    return fetch(`${url}${path}${queryParams}`, {
      headers: getHeaders(),
      method: 'GET'
    })
  }

  return await makeHttpCall(httpCall)
}

const loginUser = async response => {
  if (response.err) {
    console.log('Error login user ', response.err)
    alertStore.setAlert({
      type: FEEDBACK.DANGER,
      message: i18n.t('login.messages.loginFailed'),
    })
  } else {
    if (response.result) {
      const user = {
        email: appStore.user.email,
        token: get(response, 'result.idToken', appStore.user.token),
        accessToken: get(response, 'result.accessToken', appStore.user.accessToken),
        refreshToken: get(response, 'result.refreshToken', appStore.user.refreshToken),
        userId: get(response, 'result.userId', appStore.user.userId),
        sub: appStore.user.sub,
      }
      appStore.setUser(user)
    }
  }
}

const makeHttpCall = async httpCall => {
  let responseJson

  try {
    const tokenExpirationDate = get(appStore, 'user.tokenExpirationDate')
    const shouldRefreshToken = tokenExpirationDate && tokenExpirationDate < new Date()
    if (shouldRefreshToken) {
      await new Promise(resolve => setTimeout(() => resolve(), 5000))
      responseRefreshToken = signIn({
        username: appStore.user.email,
        password: appStore.user.sub
      }, loginUser)
    }

    const response = await httpCall(httpCall)
    responseJson = await response.json()

    if (responseJson.message) {
      // console.log('makeHttpCall: ', responseJson)
    }
  } catch (err) {
    console.log('makeHttpCall: ', err)
    responseJson = err
  }

  return responseJson
}

export const deleteData = async (path = '', url = API_URL) => {
  const response = await fetch(`${url}${path}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export const fetchMe = async () => {
  return await fetchData(`/ac-profile/me`)
}

export const fetchMeasures = async () => {
  return await fetchData(`/ac-indicators/measures/me`)
}

export const fetchConcepts = async () => {
  return await fetchData(`/ac-indicators/concepts/me`)
}

export const fetchFrequencies = async () => {
  return await fetchData(`/ac-indicators/frequencies/me`)
}

export const fetchProfileById = async (profileId) => {
  const userData = await fetchData(`/ac-profile/${profileId}`)
  return userData
}

export const mutateProfileUserId = async (profileId, userId) => {
  const userData = await fetchData(`/ac-profile/${profileId}`)
  const data = await postData({ 
    key: 'c75af2f5-0fab-4fc0-8f54-2bd355bbe27a',
    items: [{
      CODIGO: profileId,
      USER_ID: userId
    }]
  }, '/ac-profile');
  return userData
}
