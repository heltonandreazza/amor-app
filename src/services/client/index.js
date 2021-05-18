import i18n from 'i18n-js'
import forIn from 'lodash/forIn'
import get from 'lodash/get'
import { API_URL, FEEDBACK } from 'services/constants'
import { alertStore } from 'services/stores/AlertStore'
import { appStore } from 'services/stores/AppStore'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'accept': '*/*',
}

const getHeaders = () => {
  let headers = { ...DEFAULT_HEADERS }
  if(appStore?.user?.token) {
    headers = {
      ...headers,
      Authorization: appStore?.user?.token ? `Bearer ${appStore.user.token}` : '',
    }
  }
  return headers
}

export const mutateData = async (data = {}, path = '', method = 'POST', url = API_URL) => {
  console.log('mutateData', data, `${url}${path}`, {
    headers: getHeaders(),
    method: method, // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data)
  })
  const httpCall = () => fetch(`${url}${path}`, {
    headers: getHeaders(),
    method: method, // *GET, POST, PUT, DELETE, etc.
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

const login = async (response) => {
  if (response?.status > 400) {
    console.log('Error login user ', response.title)
    alertStore.setAlert({
      type: FEEDBACK.DANGER,
      message: i18n.t('login.messages.loginFailed'),
    })
  } else {
    if (response) {
      const user = {
        token: get(response, 'token', appStore?.user?.token),
        refreshToken: get(response, 'expiration', appStore?.user?.refreshToken),
        userId: Number(get(response, 'person.id', appStore?.user?.userId)).toString(),
        phone: get(response, 'person.phone', appStore?.user?.phone),
        name: get(response, 'person.name', appStore?.user?.name),
        address: get(response, 'address', appStore?.user?.address),
      }
      if(appStore.user) {
        appStore.user.setInfo(user)
      } else {
        appStore.setUser(user)
      }
    }
  }
}

const makeHttpCall = async httpCall => {
  let responseJson
  try {
    const tokenExpirationDate = get(appStore, 'user.tokenExpirationDate')
    const shouldRefreshToken = tokenExpirationDate && tokenExpirationDate < new Date()
    if (shouldRefreshToken) {
      try {
        console.log('responseRefreshToken1', `${API_URL}'/Authentication/SignIn'`)
        r = await fetch(`${API_URL}'/Authentication/SignIn'`, {
          headers: { ...DEFAULT_HEADERS },
          method: 'POST',
          body: JSON.stringify({
            email: appStore?.user?.email,
            password: appStore?.user?.sub
          })
        })
        console.log('responseRefreshToken2', r)
        responseRefreshToken = await r.json()
        console.log('responseRefreshToken3', responseRefreshToken)
        await login(responseRefreshToken)
      } catch (e) {
        console.log(`makeHttpCall: ${e}`)
        appStore.logout()
      }
    }

    const response = await httpCall(httpCall)
    console.log('makeHttpCall: response', response)
    responseJson = await response.json()
  } catch (err) {
    console.log('makeHttpCall: error ', err)
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
  return await fetchData(`/User`)
}

export const fetchOng = async () => {
  return await fetchData(`/Ong`)
}

const getParams = ({ 
  id,
  phone,
  name,
  document,
  about,
  needs,
  startDate,
  endDate,
  openingTime,
  closingTime,
  photos,
  address,
  supporters,
  pageProfileLink,
}) => {
  let params = {}

  if (id) params = {...params, id}
  if (phone) params = {...params, phone}
  if (name) params = {...params, name}
  if (document) params = {...params, document}
  if (about) params = {...params, about}
  if (needs) params = {...params, needs}
  if (openingTime) params = {...params, openingTime}
  if (closingTime) params = {...params, closingTime}
  if (startDate) params = {...params, startDate: startDate ? startDate.toISOString() : null}
  if (endDate) params = {...params, endDate: endDate ? endDate.toISOString() : null}
  if (photos) params = {...params, photos}
  if (address) params = {...params, address}
  if (supporters) params = {...params, supporters}
  if (pageProfileLink) params = {...params, pageProfileLink}

  return params
}

export const mutateOng = async (props) => {
  const params = getParams(props)
  const data = await mutateData(params, '/Ong', 'PUT');
  return data
}

export const mutateEvent = async (props) => {
  const params = getParams(props)
  const data = await mutateData(params, '/Event', 'PUT');
  return data
}

export const mutateHomeless = async (props) => {
  const params = getParams(props)
  const data = await mutateData({...params, counterNotFound: props?.counterNotFound}, '/Homeless', 'PUT');
  return data
}

export const mutateEventParticipants = async (params) => {
  const data = await mutateData(params, '/EventParticipants');
  return data
}

export const mutatePayment = async (params) => {
  const data = await mutateData(params, '/Payment');
  return data
}

export const searchOnMyLocation = async (params) => {
  const data = await mutateData(params, '/Search');
  return data
}

export const signIn = async ({ email, password }) => {
  const data = await mutateData({ email, password }, '/Authentication/SignIn');
  return data
}

export const signUp = async ({ email, password, phone, name, document }) => {
  const data = await mutateData({ email, password, phone, name, document }, '/Authentication/SignUp');
  return data
}
