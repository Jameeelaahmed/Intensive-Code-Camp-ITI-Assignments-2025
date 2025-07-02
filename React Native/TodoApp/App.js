import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatListCom from './components/FlatList/FlatList';
import SectionListCom from './components/SectionList/SectionListCom';
import Todo from './components/Todo/Todo';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FlatListCom></FlatListCom> */}
      {/* <SectionListCom /> */}
      <Todo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
