import { Container, Fab, Icon, Left, List, ListItem, Right, Text } from 'native-base'
import * as React from 'react'
import config from '../config'
import { useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'

function FlashcardsScreen() {
  const { flashcards } = useFlashcards()
  const { navigate } = useNavigation()

  return (
    <Container>
      {flashcards && (
        <List>
          <ListItem itemHeader first>
            <Text>FLASHCARDS</Text>
          </ListItem>
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
      <Fab
        style={{ backgroundColor: '#35a835' }}
        onPress={() => navigate(config.routes.newFlaschard)}
        position="bottomRight"
      >
        <Icon type="Entypo" name="plus" />
      </Fab>
    </Container>
  )
}

export default FlashcardsScreen
