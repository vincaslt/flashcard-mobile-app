import { Card, CardItem, Text } from 'native-base'
import * as React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { FlashCard } from '../hooks/useFlashcards'

interface Props {
  flashcard: FlashCard
}

function FlashCardItem({ flashcard }: Props) {
  const [flipped, setFlipped] = React.useState(false)

  const flip = () => setFlipped(isFlipped => !isFlipped)

  return (
    <TouchableWithoutFeedback onPress={flip}>
      <Card style={{ elevation: 2, height: 400 }}>
        <CardItem cardBody>
          {flipped ? <Text>{flashcard.flipside}</Text> : <Text>{flashcard.original}</Text>}
        </CardItem>
      </Card>
    </TouchableWithoutFeedback>
  )
}

export default FlashCardItem
