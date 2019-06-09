import { Card, CardItem, H2 } from 'native-base'
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
        <CardItem
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
          cardBody
        >
          {flipped ? <H2>{flashcard.flipside}</H2> : <H2>{flashcard.original}</H2>}
        </CardItem>
      </Card>
    </TouchableWithoutFeedback>
  )
}

export default FlashCardItem
