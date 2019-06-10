import { distanceInWordsToNow, min } from 'date-fns'
import { Container, Content, H2, Text } from 'native-base'
import * as React from 'react'
import { Platform } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import FlashCardItem from '../components/FlashCardItem'
import { FlashCard, useFlashcards } from '../hooks/useFlashcards'

// TODO: when no words, say next word in xx:xx and refresh when the time is up
function StudyScreen() {
  const cachedInitialCards = React.useRef<FlashCard[]>()

  const { flashcards, pendingFlashcards, fail, success } = useFlashcards()
  const [lastCardSwiped, setLastCardSwiped] = React.useState(false)

  // Swiper requires cards array to never change...
  if (!cachedInitialCards.current && pendingFlashcards.length > 0) {
    cachedInitialCards.current = pendingFlashcards
  }

  const upcomingAt =
    flashcards.length > 0 &&
    min(...(flashcards.map(({ nextRepetition }) => nextRepetition).filter(Boolean) as Date[]))

  return (
    <Container>
      {lastCardSwiped || pendingFlashcards.length === 0 ? (
        <Content
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          padder
        >
          <H2>All done!</H2>
          {upcomingAt && <Text>Next up in {distanceInWordsToNow(upcomingAt)}</Text>}
        </Content>
      ) : (
        <Swiper
          useViewOverflow={Platform.OS === 'ios'}
          verticalSwipe={false}
          cards={cachedInitialCards.current}
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
