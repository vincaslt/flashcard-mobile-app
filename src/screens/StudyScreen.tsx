import { distanceInWordsToNow, min } from 'date-fns'
import { Button, Container, Content, H2, Text } from 'native-base'
import * as React from 'react'
import { Platform, RefreshControl, ScrollView } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import FlashCardItem from '../components/FlashCardItem'
import config from '../config'
import { FlashCard, useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'
import { shuffle } from '../utils/array'

function StudyScreen() {
  const cachedInitialCards = React.useRef<FlashCard[]>()

  const [refreshing, setRefreshing] = React.useState(false)
  const { flashcards, pendingFlashcards, fail, success } = useFlashcards()
  const [lastCardSwiped, setLastCardSwiped] = React.useState(false)
  const { navigate } = useNavigation()

  React.useEffect(() => {
    if (refreshing) {
      setRefreshing(false)
    }
  }, [refreshing])

  // Swiper requires cards array to never change...
  if (!cachedInitialCards.current && pendingFlashcards.length > 0) {
    cachedInitialCards.current = shuffle(pendingFlashcards)
  }

  const upcomingAt =
    flashcards.length > 0 &&
    min(...(flashcards.map(({ nextRepetition }) => nextRepetition).filter(Boolean) as Date[]))

  return (
    <Container>
      {lastCardSwiped || pendingFlashcards.length === 0 ? (
        <Content
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
          }
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          padder
        >
          {flashcards.length > 0 ? (
            <>
              <H2>All done!</H2>
              {upcomingAt && (
                <Text style={{ marginTop: 20 }}>Next up in {distanceInWordsToNow(upcomingAt)}</Text>
              )}
            </>
          ) : (
            <>
              <H2>Welcome!</H2>
              <Button
                style={{ alignSelf: 'center', marginTop: 20 }}
                onPress={() => navigate(config.routes.newFlaschard)}
              >
                <Text>Create a flashcard</Text>
              </Button>
            </>
          )}
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
