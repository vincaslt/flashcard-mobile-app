import { Container, Fab, Icon, Left, List, ListItem, Right, Text } from 'native-base'
import * as React from 'react'
import { useFlashcards } from '../hooks/useFlashcards'

function FlashcardsScreen() {
  const { flashcards, addFlashcard } = useFlashcards()

  return (
    <Container>
      {flashcards && (
        <List>
          {flashcards.map(flashcard => (
            <ListItem noIndent key={flashcard.id}>
              <Left>
                <Text>{flashcard.original}</Text>
              </Left>
              <Right>
                <Text>{flashcard.flipside}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      )}
      <Fab style={{ backgroundColor: '#35a835' }} onPress={addFlashcard} position="bottomRight">
        <Icon type="Entypo" name="plus" />
      </Fab>
    </Container>
  )
}

export default FlashcardsScreen
