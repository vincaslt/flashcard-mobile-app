import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import * as React from 'react'
import config from '../config'
import { useNavigation } from '../providers/NavigationProvider'

function AppFooter() {
  const { navigate } = useNavigation()

  return (
    <Footer>
      <FooterTab>
        <Button active vertical onPress={() => navigate(config.routes.study)}>
          <Icon type="Entypo" active name="open-book" />
          <Text>Study</Text>
        </Button>
        <Button vertical onPress={() => navigate(config.routes.newFlashcard)}>
          <Icon type="Entypo" name="add-to-list" />
          <Text>New Card</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default AppFooter
