import { useAsyncStorage } from '@react-native-community/async-storage'
import { addDays, addHours, isAfter } from 'date-fns'
import * as React from 'react'
import config from '../config'

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

const nextDate: { [key in FlashcardLevel]: () => Date } = {
  [FlashcardLevel.None]: () => addHours(new Date(), 12),
  [FlashcardLevel.New]: () => addDays(new Date(), 1),
  [FlashcardLevel.Fresh]: () => addDays(new Date(), 3),
  [FlashcardLevel.Mature]: () => addDays(new Date(), 7),
  [FlashcardLevel.Old]: () => addDays(new Date(), 14),
  [FlashcardLevel.Known]: () => addDays(new Date(), 28)
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
  const { getItem, setItem } = useAsyncStorage(config.storageKey)

  React.useEffect(() => {
    let cancelled = false
    getItem().then(item => {
      if (!cancelled) {
        setFlashcards(item ? JSON.parse(item) : [])
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const upcomingFlashcards = (flashcards || []).filter(
    ({ level, nextRepetition }) =>
      level === FlashcardLevel.None || (nextRepetition && isAfter(new Date(), nextRepetition))
  )

  const updateLevel = (flashcard: FlashCard, level: FlashcardLevel) => {
    const updated = {
      ...flashcard,
      nextRepetition: nextDate[flashcard.level](),
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
    upcomingFlashcards,
    flashcards
  }
}
