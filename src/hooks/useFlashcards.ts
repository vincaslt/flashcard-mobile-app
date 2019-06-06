import { useAsyncStorage } from '@react-native-community/async-storage'
import { addDays, isAfter } from 'date-fns'
import * as React from 'react'

enum FlashcardLevel {
  None,
  New,
  Fresh,
  Mature,
  Old,
  Known
}

const nextLevel: { [key in FlashcardLevel]: FlashcardLevel } = {
  [FlashcardLevel.None]: FlashcardLevel.New,
  [FlashcardLevel.New]: FlashcardLevel.Fresh,
  [FlashcardLevel.Fresh]: FlashcardLevel.Mature,
  [FlashcardLevel.Mature]: FlashcardLevel.Old,
  [FlashcardLevel.Old]: FlashcardLevel.Known,
  [FlashcardLevel.Known]: FlashcardLevel.Known
}

const nextDay: { [key in FlashcardLevel]: FlashcardLevel } = {
  [FlashcardLevel.None]: 0,
  [FlashcardLevel.New]: 1,
  [FlashcardLevel.Fresh]: 3,
  [FlashcardLevel.Mature]: 7,
  [FlashcardLevel.Old]: 14,
  [FlashcardLevel.Known]: 28
}

export interface FlashCard {
  id: string
  original: string
  flipside: string
  level: FlashcardLevel // knowledge level, retention
  nextRepetition?: Date
}

export function useFlashcards() {
  const cached = React.useRef<FlashCard[]>()
  const [loading, setLoading] = React.useState(true)
  const [flashcards, setFlashcards] = React.useState<FlashCard[]>()
  const { getItem, setItem } = useAsyncStorage('@flashcards')

  React.useEffect(() => {
    getItem().then(item => {
      setFlashcards(item ? JSON.parse(item) : [])
      setLoading(false)
    })
  }, [])

  const upcomingFlashcards = (flashcards || []).filter(
    ({ level, nextRepetition }) =>
      level === FlashcardLevel.None || (nextRepetition && isAfter(new Date(), nextRepetition))
  )

  const updateLevel = (flashcard: FlashCard, level: FlashcardLevel) => {
    const updated = {
      ...flashcard,
      nextRepetition: addDays(new Date(), nextDay[level]),
      level
    }

    if (level) {
      cached.current = [...(cached.current || []).filter(({ id }) => id !== updated.id), updated]
      setItem(JSON.stringify(cached.current))
    }
  }

  const fail = (flashcard: FlashCard) => updateLevel(flashcard, FlashcardLevel.New)
  const success = (flashcard: FlashCard) => updateLevel(flashcard, nextLevel[flashcard.level])

  return {
    success,
    fail,
    loading,
    upcomingFlashcards
  }
}
