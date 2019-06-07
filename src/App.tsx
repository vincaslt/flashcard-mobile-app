import { Container } from 'native-base'
import * as React from 'react'
import AppFooter from './components/AppFooter'
import config from './config'
import { NavigationProvider, useActiveRoute } from './providers/NavigationProvider'
import NewFlashcardScreen from './screens/NewFlashcardScreen'
import StudyScreen from './screens/StudyScreen'

function App() {
  return (
    <NavigationProvider
      index={config.routes.study}
      routes={[config.routes.study, config.routes.newFlashcard]}
    >
      <AppRoutes />
    </NavigationProvider>
  )
}

function AppRoutes() {
  const route = useActiveRoute()

  return (
    <Container>
      {route === config.routes.study && <StudyScreen />}
      {route === config.routes.newFlashcard && <NewFlashcardScreen />}
      <AppFooter />
    </Container>
  )
}

export default App
