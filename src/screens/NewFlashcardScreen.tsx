import { Button, Container, Form, Item, Label, Text, Textarea, Toast } from 'native-base'
import * as React from 'react'
import config from '../config'
import { useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'

function NewFlashcardScreen() {
  const { navigate } = useNavigation()
  const [frontside, setFrontside] = React.useState('')
  const [backside, setBackside] = React.useState('')
  const { addFlashcard } = useFlashcards()

  const handleAddFlashcard = () => {
    addFlashcard(frontside, backside)
    Toast.show({
      text: 'Flashcard added',
      position: 'top'
    })
    navigate(config.routes.flashcards)
  }

  return (
    <Container>
      <Form>
        <Item>
          <Textarea
            placeholder="Front Side"
            rowSpan={3}
            value={frontside}
            onChangeText={setFrontside}
          />
        </Item>
        <Item last>
          <Textarea
            placeholder="Back Side"
            rowSpan={3}
            value={backside}
            onChangeText={setBackside}
          />
        </Item>
      </Form>
      <Button block style={{ margin: 15, marginTop: 30 }} onPress={handleAddFlashcard}>
        <Text>Save</Text>
      </Button>
    </Container>
  )
}

export default NewFlashcardScreen
