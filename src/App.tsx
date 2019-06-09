import { Container, Text } from 'native-base'
import * as React from 'react'
import AppFooter from './components/AppFooter'
import config from './config'
import { CachedStateProvider, useCachedStateStatus } from './providers/CachedStateProvider'
import { NavigationProvider, useActiveRoute } from './providers/NavigationProvider'
import FlashcardsScreen from './screens/FlashcardsScreen'
import StudyScreen from './screens/StudyScreen'

function App() {
  return (
    <CachedStateProvider>
      <NavigationProvider
        index={config.routes.study}
        routes={[config.routes.study, config.routes.flashcards]}
      >
        <AppRoutes />
      </NavigationProvider>
    </CachedStateProvider>
  )
}

function AppRoutes() {
  const route = useActiveRoute()
  const { loading } = useCachedStateStatus()

  return (
    <Container>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {route === config.routes.study && <StudyScreen />}
          {route === config.routes.flashcards && <FlashcardsScreen />}
        </>
      )}
      <AppFooter />
    </Container>
  )
}

export default App
