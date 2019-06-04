import * as React from 'react';
import { StyleSheet,  View} from 'react-native';
import { Router } from './providers/RouterProvider';
import MenuScreen from './screens/MenuScreen';
import StudyScreen from './screens/StudyScreen';

function App() {
  return (
    <View style={styles.container}>
      <Router index="menu" routes={[
        { key: 'menu', screen: MenuScreen },
        { key: 'study', screen: StudyScreen },
      ]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App