import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Import your existing screens
import HomeScreen from './screens/HomeContent';
import ProductosScreen from './screens/Productos';
import LoginContent from './screens/LoginContent';
import CarritoScreen from './screens/Carrito';
import DetalleProductoComponent from './screens/DetalleProducto'; // Import DetalleProductoComponent
import Registro from './screens/Registro';
import AuthenticationScreen from './screens/AuthenticationScreen'; // Import AuthenticationScreen
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create a stack navigator


const ProductosStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginContent} />
    <Stack.Screen name="Registro" component={Registro} />
    <Stack.Screen name="Productos" component={ProductosScreen} />
    <Stack.Screen name="DetalleProducto" component={DetalleProductoComponent} />
  </Stack.Navigator>
);

const App = () => (
  <View style={styles.container}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* Use ProductosStackScreen as a component within a Screen */}
        <Tab.Screen name="Productos" component={ProductosStackScreen} />
        <Tab.Screen name="Authentication" component={AuthenticationScreen} />
        <Tab.Screen name="Carrito" component={CarritoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;