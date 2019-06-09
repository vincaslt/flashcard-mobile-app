import { Container, Root, Text } from 'native-base'
import * as React from 'react'
import AppFooter from './components/AppFooter'
import config from './config'
import { CachedStateProvider, useCachedStateStatus } from './providers/CachedStateProvider'
import { NavigationProvider } from './providers/NavigationProvider'
import FlashcardsScreen from './screens/FlashcardsScreen'
import NewFlashcardScreen from './screens/NewFlashcardScreen'
import StudyScreen from './screens/StudyScreen'

function AppWrapper() {
  return (
    <Root>
      <CachedStateProvider>
        <NavigationProvider
          index={config.routes.study}
          routes={[
            { key: config.routes.study, screen: StudyScreen },
            { key: config.routes.flashcards, screen: FlashcardsScreen },
            { key: config.routes.newFlaschard, screen: NewFlashcardScreen }
          ]}
        >
          {screen => <App screen={screen} />}
        </NavigationProvider>
      </CachedStateProvider>
    </Root>
  )
}

function App({ screen }: { screen: React.ReactNode }) {
  const { loading } = useCachedStateStatus()

  return (
    <Container>
      {loading ? <Text>Loading...</Text> : screen}
      <AppFooter />
    </Container>
  )
}

export default AppWrapper
