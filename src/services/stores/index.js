import { createContext } from 'react'
import { appStore } from './AppStore'
import { alertStore } from './AlertStore'

export const AppStoreContext = createContext(appStore)
export const AlertStoreContext = createContext(alertStore)
