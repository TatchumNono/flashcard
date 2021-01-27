import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import AddDeckScreen from './components/AddDeckScreen';
import DeckDetails from './components/DeckDetails';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { setLocalNotification, note } from './notification';

export default function App() {
  const Tab = createBottomTabNavigator();
  const HomeStack = createStackNavigator();

  React.useEffect(() => {
    setLocalNotification();
    note();
  }, []);

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Deck" component={DeckDetails} />
        <HomeStack.Screen name="Add" component={AddCard} />
        <HomeStack.Screen name="Quiz" component={Quiz} />
      </HomeStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle-outline' : 'add-circle-sharp';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Add" component={AddDeckScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
  },
});
