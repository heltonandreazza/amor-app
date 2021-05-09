import { useLayoutEffect } from 'react'

export const useNavigationEvent = (listenerName, callback, navigation) => {
  useLayoutEffect(() => {
    const listener = navigation.addListener(listenerName, callback)
    return () => listener.remove()
  }, [callback, listenerName, navigation])
}
