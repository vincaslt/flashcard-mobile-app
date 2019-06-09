import { useAsyncStorage } from '@react-native-community/async-storage'
import * as React from 'react'

interface CachedState {
  [key: string]: any
}

type CachedStateUpdater = <T>(key: string, update: (prev: T) => T) => void

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

  function updateState<T>(key: string, update: (prev: T) => T) {
    setCachedState(state => ({ ...state, [key]: update(state![key]) }))
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

  const stateUpdater = (update: (prev: T) => T) => updateState && updateState(key, update)

  return [cachedState![key], stateUpdater] as [T | undefined, (update: (prev: T) => T) => void]
}

export { CachedStateProvider, useCachedState, useCachedStateStatus }
