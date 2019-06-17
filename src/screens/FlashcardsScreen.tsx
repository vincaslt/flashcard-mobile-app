import {
  Button,
  Container,
  Content,
  Fab,
  H2,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Toast
} from 'native-base'
import * as React from 'react'
import { ListView } from 'react-native'
import config from '../config'
import { FlashCard, FlashcardLevel, useFlashcards } from '../hooks/useFlashcards'
import { useNavigation } from '../providers/NavigationProvider'

const SECTION_TITLE: { [key: number]: string } = {
  [FlashcardLevel.None]: 'Not practiced',
  [FlashcardLevel.New]: 'Needs a lot of practice',
  [FlashcardLevel.Fresh]: 'Needs some practice',
  [FlashcardLevel.Mature]: 'Needs a little practice',
  [FlashcardLevel.Old]: 'Needs practice rarely',
  [FlashcardLevel.Known]: 'Known well already'
}

function FlashcardsScreen() {
  const { flashcards, deleteFlashcard } = useFlashcards()
  const { navigate } = useNavigation()

  const handleDelete = (
    id: string,
    sectionId: number | string,
    rowId: number | string,
    rowMap: any
  ) => {
    rowMap[`${sectionId}${rowId}`].props.closeRow()
    deleteFlashcard(id)
    Toast.show({
      text: 'Flashcard removed',
      buttonText: 'ok'
    })
  }

  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (r1, r2) => r1 !== r2
  })

  const getSections = () => {
    return {
      [FlashcardLevel.None]: flashcards.filter(({ level }) => level === FlashcardLevel.None),
      [FlashcardLevel.New]: flashcards.filter(({ level }) => level === FlashcardLevel.New),
      [FlashcardLevel.Fresh]: flashcards.filter(({ level }) => level === FlashcardLevel.Fresh),
      [FlashcardLevel.Mature]: flashcards.filter(({ level }) => level === FlashcardLevel.Mature),
      [FlashcardLevel.Old]: flashcards.filter(({ level }) => level === FlashcardLevel.Old),
      [FlashcardLevel.Known]: flashcards.filter(({ level }) => level === FlashcardLevel.Known)
    }
  }

  return (
    <Container>
      {flashcards.length > 0 ? (
        <List
          rightOpenValue={-75}
          disableRightSwipe
          dataSource={ds.cloneWithRowsAndSections(getSections())}
          renderRightHiddenRow={(
            data: FlashCard,
            sectionId: string | number,
            rowId: string | number,
            rowMap: any
          ) => (
            <Button full danger onPress={() => handleDelete(data.id, sectionId, rowId, rowMap)}>
              <Icon active name="trash" />
            </Button>
          )}
          renderSectionHeader={(sectionData, sectionId) =>
            sectionData.length > 0 ? (
              <ListItem itemDivider>
                <Left>
                  <Text>{SECTION_TITLE[sectionId as number]}</Text>
                </Left>
              </ListItem>
            ) : (
              <></>
            )
          }
          renderRow={(flashcard, section) => (
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
      ) : (
        <Content
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          padder
        >
          <H2>No flashcards yet</H2>
          <Text style={{ marginTop: 20 }}>Create your first flashcard using a button below</Text>
        </Content>
      )}
      <Fab
        style={{ backgroundColor: 'orange' }}
        onPress={() => navigate(config.routes.newFlaschard)}
        position="bottomRight"
      >
        <Icon type="Entypo" name="plus" />
      </Fab>
    </Container>
  )
}

export default FlashcardsScreen
