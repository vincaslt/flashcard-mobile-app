import { Button, Container, Fab, Icon, Left, List, ListItem, Right, Text, Toast } from 'native-base'
import * as React from 'react'
import { ListView } from 'react-native'
import config from '../config'
import { FlashCard, useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'

function FlashcardsScreen() {
  const { flashcards, deleteFlashcard } = useFlashcards()
  const { navigate } = useNavigation()

  const handleDelete = (id: string) => {
    deleteFlashcard(id)
    Toast.show({
      text: 'Flashcard removed',
      position: 'top'
    })
  }

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

  return (
    <Container>
      {flashcards && (
        <List
          rightOpenValue={-75}
          dataSource={ds.cloneWithRows(flashcards)}
          renderRightHiddenRow={(data: FlashCard) => (
            <Button full danger onPress={() => handleDelete(data.id)}>
              <Icon active name="trash" />
            </Button>
          )}
          renderRow={flashcard => (
            <ListItem noIndent key={flashcard.id}>
              <Left>
                <Text>{flashcard.original}</Text>
              </Left>
              <Right>
                <Text>{flashcard.flipside}</Text>
              </Right>
            </ListItem>
          )}
        />
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
