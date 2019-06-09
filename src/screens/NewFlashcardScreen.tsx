import { Button, Container, Form, Item, Label, Text, Textarea, Toast } from 'native-base'
import * as React from 'react'
import config from '../config'
import { useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'

function NewFlashcardScreen() {
  const { navigate } = useNavigation()
  const [frontside, setFrontside] = React.useState()
  const [backside, setBackside] = React.useState()
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
        <Item floatingLabel>
          <Label>Front side</Label>
          <Textarea multiline rowSpan={3} onChangeText={setFrontside} />
        </Item>
        <Item floatingLabel last>
          <Label>Back side</Label>
          <Textarea multiline rowSpan={3} onChangeText={setBackside} />
        </Item>
      </Form>
      <Button block style={{ margin: 15, marginTop: 30 }} onPress={handleAddFlashcard}>
        <Text>Save</Text>
      </Button>
    </Container>
  )
}

export default NewFlashcardScreen
