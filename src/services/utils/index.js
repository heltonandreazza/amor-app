import base64 from 'base-64'
import { Linking } from 'react-native'

export const parseJwt = token => {
  try {
    const base64Url = token.split('.')[1]
    const base64Text = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(base64.decode(base64Text))
  } catch (e) {
    console.log(`[logException] parseJwt: ${e}`)
    return ''
  }
}

export const fakeFetch = (data, timeout = 2000) => new Promise(resolve =>
  setTimeout(
    () =>
      resolve({
        data,
      }),
    timeout
  )
)

export const textTruncate = (str, length = 100, ending = '...') => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  }
  return str
}

export const openLink = async url => {
  const supported = await Linking.canOpenURL(url)

  if (supported) {
    Linking.openURL(url)
  }
}
