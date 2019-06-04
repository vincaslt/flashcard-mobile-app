import * as React from 'react'
import { View, Text, Button } from 'react-native';
import { useNavigation } from '../providers/RouterProvider';

function MenuScreen() {
  const { navigate } = useNavigation()

  const handleClick = () => navigate('study')

  return (
    <View>
      <Text>Menu</Text>
      <Button title="Go Study" onPress={handleClick}>Study</Button>
    </View>
  );
}

export default MenuScreen