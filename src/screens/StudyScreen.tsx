import { Container, Text } from 'native-base'
import * as React from 'react'
import { Platform } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import FlashCardItem from '../components/FlashCardItem'
import { FlashCard, useFlashcards } from '../hooks/useFlashcards'

// TODO: when no words, say next word in xx:xx and show add and refresh button
// TODO: add new flashcard
function StudyScreen() {
  const { loading, upcomingFlashcards, fail, success } = useFlashcards()
  const [lastCardSwiped, setLastCardSwiped] = React.useState(false)

  return (
    <Container>
      {loading ? (
        <Text>Loading</Text>
      ) : lastCardSwiped || upcomingFlashcards.length === 0 ? (
        <Text>All done</Text>
      ) : (
        <Swiper
          useViewOverflow={Platform.OS === 'ios'}
          verticalSwipe={false}
          cards={upcomingFlashcards}
          renderCard={(flashcard: FlashCard) => <FlashCardItem flashcard={flashcard} />}
          onSwipedRight={(id: number, card: FlashCard) => success(card)}
          onSwipedLeft={(id: number, card: FlashCard) => fail(card)}
          onSwipedAll={() => setLastCardSwiped(true)}
          backgroundColor="#DFDFDF"
          stackSize={3}
        />
      )}
    </Container>
  )
}

export default StudyScreen
