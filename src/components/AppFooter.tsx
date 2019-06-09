import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import * as React from 'react'
import config from '../config'
import { useActiveRoute, useNavigation } from '../providers/NavigationProvider'

function AppFooter() {
  const { navigate } = useNavigation()
  const activeRoute = useActiveRoute()

  return (
    <Footer>
      <FooterTab>
        <Button
          active={activeRoute === config.routes.study}
          vertical
          onPress={() => navigate(config.routes.study)}
        >
          <Icon type="Entypo" active name="open-book" />
          <Text>Study</Text>
        </Button>
        <Button
          active={activeRoute === config.routes.flashcards}
          vertical
          onPress={() => navigate(config.routes.flashcards)}
        >
          <Icon type="Entypo" name="list" />
          <Text>Flashcards</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default AppFooter
