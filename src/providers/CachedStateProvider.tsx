import { useAsyncStorage } from '@react-native-community/async-storage'
import * as React from 'react'

interface CachedState {
  [key: string]: any
}

type CachedStateUpdater = <T>(key: string, value: T) => void

const CachedStateContext = React.createContext<[CachedState?, CachedStateUpdater?]>([])

interface CachedStateProviderProps {
  children: React.ReactNode
}

function CachedStateProvider({ children }: CachedStateProviderProps) {
  const [cachedState, setCachedState] = React.useState<CachedState>()
  const { getItem, setItem } = useAsyncStorage('@cache')

  // Load cached state once from storage
  React.useEffect(() => {
    let cancelled = false
    getItem().then(item => {
      if (!cancelled) {
        setCachedState(item ? JSON.parse(item) : {})
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  // Sync storage every time state changes
  React.useEffect(() => {
    setItem(JSON.stringify(cachedState))
  }, [cachedState])

  function updateState<T>(key: string, value: T) {
    setCachedState(state => ({ ...state, [key]: value }))
  }

  return (
    <CachedStateContext.Provider value={[cachedState, updateState]}>
      {children}
    </CachedStateContext.Provider>
  )
}

const useCachedStateStatus = () => {
  const [cachedState] = React.useContext(CachedStateContext)

  return { loading: !cachedState }
}

function useCachedState<T>(key: string) {
  const [cachedState, updateState] = React.useContext(CachedStateContext)

  const stateUpdater = (value: T) => updateState && updateState(key, value)

  return [cachedState![key], stateUpdater] as [T | undefined, (value: T) => void]
}

export { CachedStateProvider, useCachedState, useCachedStateStatus }
