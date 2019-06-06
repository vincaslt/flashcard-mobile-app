import { Container } from 'native-base'
import * as React from 'react'
import { Router } from './providers/RouterProvider'
import StudyScreen from './screens/StudyScreen'

function App() {
  return (
    <Router
      index="study"
      routes={[{ key: 'study', screen: StudyScreen }]}
      render={screen => <Container>{screen}</Container>}
    />
  )
}

export default App
