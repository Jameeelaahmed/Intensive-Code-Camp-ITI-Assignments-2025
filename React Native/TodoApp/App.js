import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatListCom from './components/FlatList/FlatList';
import SectionListCom from './components/SectionList/SectionListCom';
import Todo from './components/Todo/Todo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ContactDetails from './components/SectionList/ContactDetails.jsx';
import Home from './components/SectionList/Home.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Contacts') {
              iconName = focused ? 'people' : 'people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5E9DFF',
          tabBarInactiveTintColor: '#A0AEC0',
          tabBarStyle: {
            backgroundColor: 'rgba(20,25,40,0.95)',
            borderTopColor: 'rgba(100,110,140,0.15)',
            borderTopWidth: 1,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Contacts" component={SectionListCom} />
      </Tab.Navigator>
    );
  }

  return (
    // <View style={styles.container}>
    //   {/* <FlatListCom></FlatListCom> */}
    //   {/* <Todo /> */}
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = {
  container: {
    flex: 1,
  }
}
