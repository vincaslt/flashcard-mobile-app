import { format, isBefore } from 'date-fns'
import { Container, Text } from 'native-base'
import * as React from 'react'
import { Platform } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import FlashCardItem from '../components/FlashCardItem'
import { FlashCard, useFlashcards } from '../hooks/useFlashcards'

// TODO: add new flashcard
// TODO: when no words, say next word in xx:xx and refresh when the time is up
function StudyScreen() {
  const { loading, flashcards, upcomingFlashcards, fail, success } = useFlashcards()
  const [lastCardSwiped, setLastCardSwiped] = React.useState(false)

  const nextEarliest =
    flashcards &&
    flashcards.reduce(
      (min, flashcard) =>
        !min || (flashcard.nextRepetition && isBefore(flashcard.nextRepetition, min))
          ? flashcard.nextRepetition
          : min,
      flashcards[0].nextRepetition
    )

  return (
    <Container>
      {loading ? (
        <Text>Loading</Text>
      ) : lastCardSwiped || upcomingFlashcards.length === 0 ? (
        <Text>All done! {nextEarliest && `Next up at ${format(nextEarliest)}`}</Text>
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
